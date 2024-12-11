import {
  AuthToken,
  Status,
  FakeData,
  User,
  PagedStatusItemRequest,
  PostStatusRequest,
} from "tweeter-shared";
import { ServerFacade } from "../../network/ServerFacade";

export class StatusService {
  private serverFacade: ServerFacade;

  public constructor() {
    this.serverFacade = new ServerFacade();
  }
  public async loadMoreFeedItems(
    request: PagedStatusItemRequest
  ): Promise<[Status[], boolean]> {
    try {
      const [feedItems, hasMore] = await this.serverFacade.getMoreFeedItems(
        request
      );
      return [feedItems, hasMore];
    } catch (error) {
      console.error("Failed to fetch feed items:", error);
      throw error;
    }
  }

  public async loadMoreStoryItems(
    request: PagedStatusItemRequest
  ): Promise<[Status[], boolean]> {
    try {
      const [feedItems, hasMore] = await this.serverFacade.getMoreStoryItems(
        request
      );
      return [feedItems, hasMore];
    } catch (error) {
      console.error("Failed to fetch story items:", error);
      throw error;
    }
  }

  public async postStatus(request: PostStatusRequest): Promise<void> {
    try {
      await this.serverFacade.postStatus(request);
    } catch (error) {
      console.error("Failed to post status:", error);
      throw error;
    }
  }
}
export default StatusService;
