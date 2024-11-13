import { AuthToken, User, FakeData, UserDto, StatusDto } from "tweeter-shared";
import { Service } from "./Service";
import UserService from "./UserService";

export class FollowService extends Service<UserDto> {
  userService: UserService;

  public constructor() {
    super();
    this.userService = new UserService();
  }
  public async loadMoreFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    return this.getFakeData(lastItem, pageSize, userAlias);
  }

  public async loadMoreFollowees(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    console.log("loading more followees from server...\n");
    return this.getFakeData(lastItem, pageSize, userAlias);
  }

  public async follow(
    token: string,
    userToFollow: UserDto
  ): Promise<[followerCount: number, followeeCount: number]> {
    await new Promise((f) => setTimeout(f, 2000));
    const followerCount = await this.userService.getFollowerCount(
      token,
      userToFollow
    );
    const followeeCount = await this.userService.getFolloweeCount(
      token,
      userToFollow
    );

    return [followerCount, followeeCount];
  }

  public async unfollow(
    token: string,
    userToUnfollow: UserDto
  ): Promise<[followerCount: number, followeeCount: number]> {
    await new Promise((f) => setTimeout(f, 2000));
    const followerCount = await this.userService.getFollowerCount(
      token,
      userToUnfollow
    );
    const followeeCount = await this.userService.getFolloweeCount(
      token,
      userToUnfollow
    );

    return [followerCount, followeeCount];
  }

  protected async getFakeData(
    lastItem: UserDto | null,
    pageSize: number,
    userAlias: string
  ): Promise<[UserDto[], boolean]> {
    console.log("Getting fake data in server...\n");
    const [items, hasMore] = FakeData.instance.getPageOfUsers(
      User.fromDto(lastItem),
      pageSize,
      userAlias
    );
    const dtos = items.map((user) => user.dto);
    console.log(lastItem);
    console.log(User.fromDto(lastItem));
    return [dtos, hasMore];
  }
}
export default FollowService;
