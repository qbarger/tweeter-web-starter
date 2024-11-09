import { AuthToken, Status, FakeData, User, StatusDto } from "tweeter-shared";
import { Service } from "./Service";

export class StatusService extends Service<StatusDto> {
  public async loadMoreFeedItems(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
  ): Promise<[StatusDto[], boolean]> {
    // TODO: Replace with the result of calling server
    const fakeData = await this.getFakeData(lastItem, pageSize, userAlias);
    return fakeData;
  }

  public async loadMoreStoryItems(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
  ): Promise<[StatusDto[], boolean]> {
    // TODO: Replace with the result of calling server
    return this.getFakeData(lastItem, pageSize, userAlias);
  }

  public async postStatus(token: string, newStatus: StatusDto): Promise<void> {
    // Pause so we can see the logging out message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server to post the status
  }

  protected async getFakeData(
    lastItem: StatusDto | null,
    pageSize: number,
    userAlias: string
  ): Promise<[StatusDto[], boolean]> {
    console.log("Getting fake data in server...\n");
    const [items, hasMore] = FakeData.instance.getPageOfStatuses(
      Status.fromDto(lastItem),
      pageSize
    );
    const dtos = items.map((status) => status.dto);
    console.log(lastItem);
    console.log(Status.fromDto(lastItem));
    return [dtos, hasMore];
  }
}
export default StatusService;
