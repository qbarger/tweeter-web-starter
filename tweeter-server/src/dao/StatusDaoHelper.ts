import { Status } from "tweeter-shared";

export class StatusDaoHelper {
  readonly author = "author_alias";
  readonly timestamp = "timestamp";

  protected generateStatusItem(status: Status) {
    return {
      [this.author]: status.user.alias,
      [this.timestamp]: status.timestamp,
    };
  }
}
