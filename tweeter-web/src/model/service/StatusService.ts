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
    // TODO: Replace with the result of calling server
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
    // TODO: Replace with the result of calling server
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

  public async postStatus(request: PostStatusRequest): Promise<void> {
    // Pause so we can see the logging out message. Remove when connected to the server
    try {
      await this.serverFacade.postStatus(request);
    } catch (error) {
      console.error("Failed to post status:", error);
      throw error;
    }

    // TODO: Call the server to post the status
  }
}
export default StatusService;
