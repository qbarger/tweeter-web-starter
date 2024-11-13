import { AuthToken, User, FakeData, UserDto, StatusDto } from "tweeter-shared";
import { Service } from "./Service";

export class FollowService extends Service<UserDto> {
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
