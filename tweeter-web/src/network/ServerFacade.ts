import {
  AuthenticationResponse,
  AuthToken,
  FollowNumResponse,
  FollowTypeRequest,
  FollowTypeResponse,
  IsFollowingRequest,
  IsFollowingResponse,
  LoginRequest,
  PagedStatusItemRequest,
  PagedStatusItemResponse,
  PagedUserItemRequest,
  PagedUserItemResponse,
  PostStatusRequest,
  RegisterRequest,
  Status,
  TweeterRequest,
  TweeterResponse,
  User,
  UserRequest,
  UserResponse,
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
  private SERVER_URL =
    "https://b8wrvfc29j.execute-api.us-east-1.amazonaws.com/Dev";

  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

  public async getMoreFollowees(
    request: PagedUserItemRequest
  ): Promise<[User[], boolean]> {
    console.log("getting more followees...\n");
    const response = await this.clientCommunicator.doPost<
      PagedUserItemRequest,
      PagedUserItemResponse
    >(request, "/followee/list");

    // Convert the UserDto array returned by ClientCommunicator to a User array
    const items: User[] | null =
      response.success && response.items
        ? response.items.map((dto) => User.fromDto(dto) as User)
        : null;

    // Handle errors
    if (response.success) {
      if (items == null) {
        throw new Error(`No followees found`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? "An unknown error occurred...");
    }
  }

  public async getMoreFollowers(
    request: PagedUserItemRequest
  ): Promise<[User[], boolean]> {
    console.log("getting more followers...\n");
    const response = await this.clientCommunicator.doPost<
      PagedUserItemRequest,
      PagedUserItemResponse
    >(request, "/follower/list");

    // Convert the UserDto array returned by ClientCommunicator to a User array
    const items: User[] | null =
      response.success && response.items
        ? response.items.map((dto) => User.fromDto(dto) as User)
        : null;

    // Handle errors
    if (response.success) {
      if (items == null) {
        throw new Error(`No followers found`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? "An unknown error occurred...");
    }
  }

  public async getMoreFeedItems(
    request: PagedStatusItemRequest
  ): Promise<[Status[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedStatusItemRequest,
      PagedStatusItemResponse
    >(request, "/feedItems/list");

    const items: Status[] | null =
      response.success && response.items
        ? response.items.map((dto) => Status.fromDto(dto) as Status)
        : null;

    if (response.success) {
      if (items == null) {
        throw new Error(`No feed items found`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? "An unknown error occurred...");
    }
  }

  public async getMoreStoryItems(
    request: PagedStatusItemRequest
  ): Promise<[Status[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedStatusItemRequest,
      PagedStatusItemResponse
    >(request, "/storyItems/list");

    const items: Status[] | null =
      response.success && response.items
        ? response.items.map((dto) => Status.fromDto(dto) as Status)
        : null;

    if (response.success) {
      if (items == null) {
        throw new Error(`No story items found`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? "An unknown error occurred...");
    }
  }

  public async postStatus(request: PostStatusRequest): Promise<void> {
    const response = await this.clientCommunicator.doPost<
      PostStatusRequest,
      TweeterResponse
    >(request, "/postStatus");
    if (!response.success) {
      throw new Error(response.message ?? "An unkown error occurred...");
    }
  }

  public async getUser(request: UserRequest): Promise<User | null> {
    const response = await this.clientCommunicator.doPost<
      UserRequest,
      UserResponse
    >(request, "/getUser");
    if (response.success) {
      if (response.user == null) {
        throw new Error(`No user found...`);
      } else {
        return new User(
          response.user.firstName,
          response.user.lastName,
          response.user.alias,
          response.user.imageUrl
        );
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? "An unknown error occurred...");
    }
  }

  public async login(request: LoginRequest): Promise<[User, AuthToken]> {
    const response = await this.clientCommunicator.doPost<
      LoginRequest,
      AuthenticationResponse
    >(request, "/login");
    if (response.success) {
      if (response.user == null || response.authToken == null) {
        throw new Error(`Unable to login...`);
      } else {
        return [
          new User(
            response.user.firstName,
            response.user.lastName,
            response.user.alias,
            response.user.imageUrl
          ),
          new AuthToken(response.authToken.token, response.authToken.timestamp),
        ];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? "An unknown error occurred...");
    }
  }

  public async register(request: RegisterRequest): Promise<[User, AuthToken]> {
    const response = await this.clientCommunicator.doPost<
      RegisterRequest,
      AuthenticationResponse
    >(request, "/register");
    if (response.success) {
      if (response.user == null || response.authToken == null) {
        throw new Error(`Unable to register...`);
      } else {
        return [
          new User(
            response.user.firstName,
            response.user.lastName,
            response.user.alias,
            response.user.imageUrl
          ),
          new AuthToken(response.authToken.token, response.authToken.timestamp),
        ];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? "An unknown error occurred...");
    }
  }

  public async getIsFollowerStatus(
    request: IsFollowingRequest
  ): Promise<boolean> {
    const response = await this.clientCommunicator.doPost<
      IsFollowingRequest,
      IsFollowingResponse
    >(request, "/isFollowerStatus");
    if (response.success) {
      if (response.isFollowing == null) {
        throw new Error(`Unable to get follower status...`);
      } else {
        return response.isFollowing;
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? "An unknown error occurred...");
    }
  }

  public async getFollowerCount(request: FollowTypeRequest): Promise<number> {
    const response = await this.clientCommunicator.doPost<
      FollowTypeRequest,
      FollowTypeResponse
    >(request, "/followerCount");
    if (response.success) {
      if (response.count == null) {
        throw new Error(`Unable to get follower count...`);
      } else {
        return response.count;
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? "An unknown error occurred...");
    }
  }

  public async getFolloweeCount(request: FollowTypeRequest): Promise<number> {
    const response = await this.clientCommunicator.doPost<
      FollowTypeRequest,
      FollowTypeResponse
    >(request, "/getFolloweeCount");
    if (response.success) {
      if (response.count == null) {
        throw new Error(`Unable to get followee count...`);
      } else {
        return response.count;
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? "An unknown error occurred...");
    }
  }

  public async follow(
    request: FollowTypeRequest
  ): Promise<[followerCount: number, followeeCount: number]> {
    const response = await this.clientCommunicator.doPost<
      FollowTypeRequest,
      FollowNumResponse
    >(request, "/follow");
    if (response.success) {
      if (response.followerCount == null || response.followeeCount == null) {
        throw new Error(`Unable to follow account...`);
      } else {
        return [response.followerCount, response.followeeCount];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? "An unknown error occurred...");
    }
  }

  public async unfollow(
    request: FollowTypeRequest
  ): Promise<[followerCount: number, followeeCount: number]> {
    const response = await this.clientCommunicator.doPost<
      FollowTypeRequest,
      FollowNumResponse
    >(request, "/unfollow");
    if (response.success) {
      if (response.followerCount == null || response.followeeCount == null) {
        throw new Error(`Unable to unfollow account...`);
      } else {
        return [response.followerCount, response.followeeCount];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? "An unkown error occurred...");
    }
  }

  public async logout(request: TweeterRequest): Promise<void> {
    const response = await this.clientCommunicator.doPost<
      TweeterRequest,
      TweeterResponse
    >(request, "/logout");
    if (!response.success) {
      console.error(response);
      throw new Error(response.message ?? "An unkown error occurred...");
    }
  }
}
