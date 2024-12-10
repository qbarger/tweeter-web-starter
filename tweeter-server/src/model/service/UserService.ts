import { User, FakeData, UserDto, AuthTokenDto } from "tweeter-shared";
import { UserDaoFactory } from "../../dao/UserDaoFactory";
import bcrypt from "bcryptjs";
import { UserData } from "../domain/UserData";

const hashPasswordSync = (password: string): string => {
  const saltRounds = 2;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

const verifyPasswordSync = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};

export class UserService {
  private daoFactory = new UserDaoFactory();
  private userDao;

  constructor() {
    this.userDao = this.daoFactory.getDao();
  }

  public async getUser(token: string, alias: string): Promise<UserDto | null> {
    const user = FakeData.instance.findUserByAlias(alias);
    const dto = user?.dto ?? null;
    return dto;
  }

  public async login(
    alias: string,
    password: string
  ): Promise<[UserDto, AuthTokenDto]> {
    const userData = await this.userDao.get(new UserData("", "", alias, ""));

    if (!userData) {
      throw new Error("User not found");
    }

    const check = verifyPasswordSync(password, userData.password ?? "");

    if (!check) {
      throw new Error("Invalid password");
    }

    const user = new User(
      userData.firstName,
      userData.lastName,
      userData.alias,
      userData.imageUrl
    );

    return [user.dto, FakeData.instance.authToken.dto];
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string
  ): Promise<[UserDto, AuthTokenDto]> {
    const user = new User(firstName, lastName, alias, imageFileExtension);
    if (
      !firstName ||
      !lastName ||
      !alias ||
      !password ||
      !userImageBytes ||
      !imageFileExtension
    ) {
      throw new Error("Invalid registration...");
    }

    const hashedPassword = hashPasswordSync(password);
    const userData = new UserData(
      user.firstName,
      user.lastName,
      user.alias,
      user.imageUrl
    );

    await this.userDao.put(userData, hashedPassword);
    const registeredUser = await this.userDao.get(userData);
    if (registeredUser === undefined) {
      throw new Error("Unable to get user...");
    } else {
      const returnedUser = new User(
        registeredUser.firstName,
        registeredUser.lastName,
        registeredUser.alias,
        registeredUser.imageUrl
      );
      return [returnedUser.dto, FakeData.instance.authToken.dto];
    }
  }

  public async getIsFollowerStatus(
    token: string,
    user: UserDto,
    selectedUser: UserDto
  ): Promise<boolean> {
    return FakeData.instance.isFollower();
  }

  public async getFollowerCount(token: string, user: UserDto): Promise<number> {
    const userData = await this.userDao.get(
      new UserData(user.firstName, user.lastName, user.alias, user.imageUrl)
    );

    return userData?.followerCount ?? 0;
  }

  public async getFolloweeCount(token: string, user: UserDto): Promise<number> {
    const userData = await this.userDao.get(
      new UserData(user.firstName, user.lastName, user.alias, user.imageUrl)
    );

    return userData?.followeeCount ?? 0;
  }

  public async logout(token: string): Promise<void> {
    await new Promise((res) => setTimeout(res, 1000));
  }
}
export default UserService;
