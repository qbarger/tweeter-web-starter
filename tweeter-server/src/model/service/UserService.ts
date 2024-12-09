import { Buffer } from "buffer";
import {
  AuthToken,
  User,
  FakeData,
  UserDto,
  AuthTokenDto,
} from "tweeter-shared";
import { DaoFactory } from "../../dao/DaoFactory";
import { UserDaoFactory } from "../../dao/UserDaoFactory";

export class UserService {
  private daoFactory: UserDaoFactory = new UserDaoFactory();
  private userDao = this.daoFactory.getDao();

  public async getUser(token: string, alias: string): Promise<UserDto | null> {
    const user = FakeData.instance.findUserByAlias(alias);
    const dto = user?.dto ?? null;
    return dto;
  }

  public async login(
    alias: string,
    password: string
  ): Promise<[UserDto, AuthTokenDto]> {
    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid alias or password");
    }

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

    await this.userDao.put(user);
    return [user.dto, FakeData.instance.authToken.dto];
  }

  public async getIsFollowerStatus(
    token: string,
    user: UserDto,
    selectedUser: UserDto
  ): Promise<boolean> {
    return FakeData.instance.isFollower();
  }

  public async getFollowerCount(token: string, user: UserDto): Promise<number> {
    return FakeData.instance.getFollowerCount(user.alias);
  }

  public async getFolloweeCount(token: string, user: UserDto): Promise<number> {
    return FakeData.instance.getFolloweeCount(user.alias);
  }

  public async logout(token: string): Promise<void> {
    await new Promise((res) => setTimeout(res, 1000));
  }
}
export default UserService;
