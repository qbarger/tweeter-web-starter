import { AuthToken, User } from "tweeter-shared";
import FollowService from "../model/FollowService";
import StatusService from "../model/StatusService";
import { StatusItemPresenter, StatusItemView } from "./StatusItemPresenter";

export const PAGE_SIZE = 10;

export class StoryPresenter extends StatusItemPresenter {
    private statusService: StatusService

    public constructor(view: StatusItemView) {
        super(view)
        this.statusService = new StatusService()
    }

    public async loadMoreItems(authToken: AuthToken, userAlias: string) {
        try {
          const [newItems, hasMore] = await this.statusService.loadMoreStoryItems(
            authToken,
            userAlias,
            PAGE_SIZE,
            this.lastItem
          );
    
          this.hasMoreItems = hasMore
          this.lastItem = newItems[newItems.length - 1]
          this.view.addItems(newItems);
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to load story items because of exception: ${error}`
          );
        }
      };
}
export default StoryPresenter