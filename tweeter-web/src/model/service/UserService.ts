import { Buffer } from "buffer";
import {
  AuthToken,
  User,
  FakeData,
  UserRequest,
  LoginRequest,
  RegisterRequest,
} from "tweeter-shared";
import { ServerFacade } from "../../network/ServerFacade";

export class UserService {
  private serverFacade: ServerFacade;

  public constructor() {
    this.serverFacade = new ServerFacade();
  }
  public async getUser(request: UserRequest): Promise<User | null> {
    try {
      const user = await this.serverFacade.getUser(request);
      return user;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      throw error;
    }
  }

  public async login(request: LoginRequest): Promise<[User, AuthToken]> {
    try {
      const response = await this.serverFacade.login(request);
      return [response[0], response[1]];
    } catch (error) {
      console.error("Failed to login user:", error);
      throw error;
    }
  }

  public async register(request: RegisterRequest): Promise<[User, AuthToken]> {
    const imageStringBase64: string = Buffer.from(
      request.userImageBytes
    ).toString("base64");
    try {
      const response = await this.serverFacade.register(request);
      return [response[0], response[1]];
    } catch (error) {
      console.error("Failed to register user:", error);
      throw error;
    }
  }

  public async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<boolean> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.isFollower();
  }

  public async getFollowerCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFollowerCount(user.alias);
  }

  public async getFolloweeCount(
    authToken: AuthToken,
    user: User
  ): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFolloweeCount(user.alias);
  }

  public async follow(
    authToken: AuthToken,
    userToFollow: User
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the follow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    const followerCount = await this.getFollowerCount(authToken, userToFollow);
    const followeeCount = await this.getFolloweeCount(authToken, userToFollow);

    return [followerCount, followeeCount];
  }

  public async unfollow(
    authToken: AuthToken,
    userToUnfollow: User
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the unfollow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server

    const followerCount = await this.getFollowerCount(
      authToken,
      userToUnfollow
    );
    const followeeCount = await this.getFolloweeCount(
      authToken,
      userToUnfollow
    );

    return [followerCount, followeeCount];
  }

  public async logout(authToken: AuthToken): Promise<void> {
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    await new Promise((res) => setTimeout(res, 1000));
  }
}
export default UserService;
