import { AuthToken, Status, FakeData, User, StatusDto } from "tweeter-shared";
import { Service } from "./Service";
import { StoryDaoFactory } from "../../dao/StoryDaoFactory";
import { SessionDaoFactory } from "../../dao/SessionDaoFactory";
import { UserDaoFactory } from "../../dao/UserDaoFactory";
import { UserData } from "../domain/UserData";

export class StatusService extends Service<StatusDto> {
  private storyDaoFactory = new StoryDaoFactory();
  private sessionDaoFactory = new SessionDaoFactory();
  private userDaoFactory = new UserDaoFactory();
  private storyDao;
  private sessionDao;
  private userDao;

  constructor() {
    super();
    this.storyDao = this.storyDaoFactory.getDao();
    this.sessionDao = this.sessionDaoFactory.getDao();
    this.userDao = this.userDaoFactory.getDao();
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
    // Check if the session is valid
    const check = await this.sessionDao.get(token);
    if (check === undefined) {
      throw new Error("Invalid authtoken. Need to login...");
    }

    const withoutAt: string = userAlias.slice(1);
    // Fetch user data based on alias
    const userdata = await this.userDao.get(
      new UserData("", "", withoutAt, "")
    );

    // Log userdata for debugging
    console.log("Fetched userdata:", userdata);

    // Check if userdata is undefined
    if (!userdata) {
      throw new Error(`User with alias ${userAlias} not found for ${userdata}`);
    }

    // Query for the next set of posts (statuses)
    const page = await this.storyDao.query(
      new User(
        userdata!.firstName,
        userdata!.lastName,
        userdata!.alias,
        userdata!.imageUrl
      ),
      pageSize,
      lastItem?.timestamp
    );

    // Map statuses to their DTOs (Data Transfer Objects)
    const statusDtoList: StatusDto[] = page.values.map((status) => status.dto);

    // Determine if there are more pages
    const hasMore = page.hasMorePages !== undefined;

    return [statusDtoList, hasMore];
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
