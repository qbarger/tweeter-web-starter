import { Buffer } from "buffer";
import {
  AuthToken,
  User,
  FakeData,
  UserRequest,
  LoginRequest,
  RegisterRequest,
  IsFollowingRequest,
  FollowTypeRequest,
  TweeterRequest,
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
    request: IsFollowingRequest
  ): Promise<boolean> {
    try {
      const response = await this.serverFacade.getIsFollowerStatus(request);
      return response;
    } catch (error) {
      console.error("Failed to get follower status:", error);
      throw error;
    }
  }

  public async getFollowerCount(request: FollowTypeRequest): Promise<number> {
    try {
      const response = await this.serverFacade.getFollowerCount(request);
      return response;
    } catch (error) {
      console.error("Failed to get follower count:", error);
      throw error;
    }
  }

  public async getFolloweeCount(request: FollowTypeRequest): Promise<number> {
    try {
      const response = await this.serverFacade.getFolloweeCount(request);
      return response;
    } catch (error) {
      console.error("Failed to get followee count:", error);
      throw error;
    }
  }

  public async follow(
    request: FollowTypeRequest
  ): Promise<[followerCount: number, followeeCount: number]> {
    try {
      await new Promise((f) => setTimeout(f, 2000));
      const followerCount = await this.getFollowerCount(request);
      const followeeCount = await this.getFolloweeCount(request);

      return [followerCount, followeeCount];
    } catch (error) {
      console.error("Failed to get follower count:", error);
      throw error;
    }
  }

  public async unfollow(
    request: FollowTypeRequest
  ): Promise<[followerCount: number, followeeCount: number]> {
    try {
      await new Promise((f) => setTimeout(f, 2000));
      const followerCount = await this.getFollowerCount(request);
      const followeeCount = await this.getFolloweeCount(request);

      return [followerCount, followeeCount];
    } catch (error) {
      console.error("Failed to get followee count", error);
      throw error;
    }
  }

  public async logout(request: TweeterRequest): Promise<void> {
    try {
      await this.serverFacade.logout(request);
    } catch (error) {
      console.error("Failed to logout", error);
      throw error;
    }
  }
}
export default UserService;
