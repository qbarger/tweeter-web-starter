import {
  User,
  FakeData,
  UserDto,
  AuthTokenDto,
  AuthToken,
} from "tweeter-shared";
import { UserDaoFactory } from "../../dao/UserDaoFactory";
import bcrypt from "bcryptjs";
import { UserData } from "../domain/UserData";
import { SessionDaoFactory } from "../../dao/SessionDaoFactory";
import { S3DaoFactory } from "../../dao/S3DaoFactory";

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
  private userDaoFactory = new UserDaoFactory();
  private sessionDaoFactory = new SessionDaoFactory();
  private s3DaoFactory = new S3DaoFactory();
  private userDao;
  private sessionDao;
  private s3Dao;

  constructor() {
    this.userDao = this.userDaoFactory.getDao();
    this.sessionDao = this.sessionDaoFactory.getDao();
    this.s3Dao = this.s3DaoFactory.getDao();
  }

  public async getUser(token: string, alias: string): Promise<UserDto | null> {
    const withoutAt = alias.slice(1);
    const userData = await this.userDao.get(
      new UserData("", "", withoutAt, "")
    );

    if (!userData) {
      throw new Error("User not found");
    }

    const user = new User(
      userData.firstName,
      userData.lastName,
      userData.alias,
      userData.imageUrl
    );
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

    const authtoken = AuthToken.Generate();
    await this.sessionDao.put(authtoken.token, "", authtoken.timestamp);

    return [user.dto, authtoken.dto];
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: string,
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

    //upload to bucket
    const bucketUrl = await this.s3Dao.upload(
      imageFileExtension,
      userImageBytes,
      alias
    );

    //hash password
    const hashedPassword = hashPasswordSync(password);
    const userData = new UserData(
      user.firstName,
      user.lastName,
      user.alias,
      bucketUrl
    );

    //put in database
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

      const authtoken = AuthToken.Generate();
      await this.sessionDao.put(authtoken.token, "", authtoken.timestamp);
      return [returnedUser.dto, authtoken.dto];
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
    await this.sessionDao.delete(token);
  }
}
export default UserService;
