import { AuthToken, Status, FakeData, User, StatusDto } from "tweeter-shared";
import { Service } from "./Service";
import { StoryDaoFactory } from "../../dao/StoryDaoFactory";
import { SessionDaoFactory } from "../../dao/SessionDaoFactory";

export class StatusService extends Service<StatusDto> {
  private storyDaoFactory = new StoryDaoFactory();
  private sessionDaoFactory = new SessionDaoFactory();
  private storyDao;
  private sessionDao;

  constructor() {
    super();
    this.storyDao = this.storyDaoFactory.getDao();
    this.sessionDao = this.sessionDaoFactory.getDao();
  }

  public async loadMoreFeedItems(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
  ): Promise<[StatusDto[], boolean]> {
    const fakeData = await this.getFakeData(lastItem, pageSize, userAlias);
    return fakeData;
  }

  public async loadMoreStoryItems(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null
  ): Promise<[StatusDto[], boolean]> {
    return this.getFakeData(lastItem, pageSize, userAlias);
  }

  public async postStatus(token: string, newStatus: StatusDto): Promise<void> {
    const authtoken = await this.sessionDao.get(token);
    if (authtoken == undefined || authtoken != token) {
      throw new Error("Invalid authtoken. Need to login...");
    }
    const current_user = new User(
      newStatus.user.firstName,
      newStatus.user.lastName,
      newStatus.user.alias,
      newStatus.user.imageUrl
    );
    await this.storyDao.put(
      new Status(newStatus.post, current_user, newStatus.timestamp)
    );
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
