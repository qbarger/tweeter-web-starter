import {
  AuthToken,
  PagedStatusItemRequest,
  Status,
  User,
} from "tweeter-shared";
import { PAGE_SIZE } from "./PagedItemPresenter";
import { StatusItemPresenter } from "./StatusItemPresenter";

export class StoryPresenter extends StatusItemPresenter {
  protected async getMoreItems(
    authToken: AuthToken,
    user: User
  ): Promise<[Status[], boolean]> {
    const request: PagedStatusItemRequest = {
      token: authToken.token,
      userAlias: user.alias,
      pageSize: PAGE_SIZE,
      lastItem: this.lastItem?.dto ?? null,
    };
    const response = await this.service.loadMoreStoryItems(request);
    return response;
  }

  protected getItemDescription(): string {
    return "load story items";
  }
}
export default StoryPresenter;
