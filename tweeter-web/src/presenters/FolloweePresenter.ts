import { AuthToken, PagedUserItemRequest, User } from "tweeter-shared";
import UserItemPresenter from "./UserItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";

export class FolloweePresenter extends UserItemPresenter {
  protected async getMoreItems(
    authToken: AuthToken,
    user: User
  ): Promise<[User[], boolean]> {
    console.log("getting more items...\n");
    const request: PagedUserItemRequest = {
      token: authToken.token,
      userAlias: user.alias,
      pageSize: PAGE_SIZE,
      lastItem: this.lastItem?.dto ?? null,
    };
    const response = await this.service.loadMoreFollowees(request);
    return response;
  }

  protected getItemDescription(): string {
    return "load followees";
  }
}
