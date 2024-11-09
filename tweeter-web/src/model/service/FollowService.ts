import { AuthToken, User, FakeData } from "tweeter-shared";
import { ServerFacade } from "../../network/ServerFacade";
import { PagedUserItemRequest } from "tweeter-shared";

export class FollowService {
  private serverFacade: ServerFacade;

  public constructor() {
    this.serverFacade = new ServerFacade();
  }

  public async loadMoreFollowers(
    request: PagedUserItemRequest
  ): Promise<[User[], boolean]> {
    console.log("loading more followers...\n");
    try {
      const [followers, hasMore] = await this.serverFacade.getMoreFollowers(
        request
      );
      return [followers, hasMore];
    } catch (error) {
      console.error("Failed to fetch followers:", error);
      throw error;
    }
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
