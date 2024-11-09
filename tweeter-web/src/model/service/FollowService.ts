import { AuthToken, User, FakeData } from "tweeter-shared";
import { ServerFacade } from "../../network/ServerFacade";
import { PagedUserItemRequest } from "tweeter-shared";

export class FollowService {
  private serverFacade: ServerFacade;

  public constructor() {
    this.serverFacade = new ServerFacade();
  }

  public async loadMoreFollowers(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfUsers(lastItem, pageSize, user.alias);
  }

  public async loadMoreFollowees(
    request: PagedUserItemRequest
  ): Promise<[User[], boolean]> {
    console.log("loading more followees...\n");
    try {
      const [followees, hasMore] = await this.serverFacade.getMoreFollowees(
        request
      );
      return [followees, hasMore];
    } catch (error) {
      console.error("Failed to fetch followees:", error);
      throw error;
    }
  }
}
export default FollowService;
