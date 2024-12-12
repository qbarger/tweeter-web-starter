import {
  AuthToken,
  User,
  FakeData,
  UserDto,
  StatusDto,
  Follow,
} from "tweeter-shared";
import { Service } from "./Service";
import UserService from "./UserService";
import { FollowDaoFactory } from "../../dao/FollowDaoFactory";
import { SessionDaoFactory } from "../../dao/SessionDaoFactory";
import { UserDaoFactory } from "../../dao/UserDaoFactory";
import { UserData } from "../domain/UserData";

export class FollowService extends Service<UserDto> {
  userService: UserService;
  private followDaoFactory = new FollowDaoFactory();
  private sessionDaoFactory = new SessionDaoFactory();
  private userDaoFactory = new UserDaoFactory();
  private followDao;
  private sessionDao;
  private userDao;

  public constructor() {
    super();
    this.userService = new UserService();
    this.followDao = this.followDaoFactory.getDao();
    this.sessionDao = this.sessionDaoFactory.getDao();
    this.userDao = this.userDaoFactory.getDao();
  }
  public async loadMoreFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    const info = await this.sessionDao.get([token, ""]);
    if (info === undefined) {
      throw new Error("Invalid authtoken. Need to login...");
    }

    const page = await this.followDao.queryFollowers(
      userAlias,
      pageSize,
      lastItem?.alias
    );
    if (page.values.length === 0) {
      return [[], false];
    }
    const followers = page.values.map((follow) => follow.follower.alias);
    const followerList = await this.userDao.batchGet(followers);

    return [followerList, page.hasMorePages];
  }

  public async loadMoreFollowees(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    const info = await this.sessionDao.get([token, ""]);
    if (info === undefined) {
      throw new Error("Invalid authtoken. Need to login...");
    }

    const page = await this.followDao.queryFollowees(
      userAlias,
      pageSize,
      lastItem?.alias
    );

    if (page.values.length === 0) {
      return [[], false];
    }
    const followees = page.values.map((follow) => follow.followee.alias);
    const followeeList = await this.userDao.batchGet(followees);

    return [followeeList, page.hasMorePages];
  }

  public async follow(
    token: string,
    userToFollow: UserDto
  ): Promise<[followerCount: number, followeeCount: number]> {
    //await new Promise((f) => setTimeout(f, 2000));

    const info = await this.sessionDao.get([token, ""]);
    if (info === undefined) {
      throw new Error("Invalid authtoken. Need to login...");
    }

    const current_user = await this.userDao.get(
      new UserData("", "", info[1].slice(1), "")
    );

    if (current_user === undefined) {
      throw new Error("User does not exist...");
    }
    const currentUser = new User(
      current_user.firstName,
      current_user.lastName,
      current_user.alias,
      current_user.imageUrl
    );
    const targetUser = new User(
      userToFollow.firstName,
      userToFollow.lastName,
      userToFollow.alias,
      userToFollow.imageUrl
    );

    const follow = new Follow(currentUser, targetUser);

    await this.followDao.put(follow);
    await this.userDao.incrementFollowers(
      new UserData(
        targetUser.firstName,
        targetUser.lastName,
        targetUser.alias.slice(1),
        targetUser.imageUrl
      )
    );
    await this.userDao.incrementFollowees(
      new UserData(
        currentUser.firstName,
        currentUser.lastName,
        currentUser.alias.slice(1),
        currentUser.imageUrl
      )
    );

    const followerCount = await this.userService.getFollowerCount(
      token,
      userToFollow
    );
    const followeeCount = await this.userService.getFolloweeCount(
      token,
      userToFollow
    );

    return [followerCount, followeeCount];
  }

  public async unfollow(
    token: string,
    userToUnfollow: UserDto
  ): Promise<[followerCount: number, followeeCount: number]> {
    //await new Promise((f) => setTimeout(f, 2000));
    const info = await this.sessionDao.get([token, ""]);
    if (info === undefined) {
      throw new Error("Invalid authtoken. Need to login...");
    }

    const current_user = await this.userDao.get(
      new UserData("", "", info[1].slice(1), "")
    );

    if (current_user === undefined) {
      throw new Error("User does not exist...");
    }
    const currentUser = new User(
      current_user.firstName,
      current_user.lastName,
      current_user.alias,
      current_user.imageUrl
    );

    const targetUser = new User(
      userToUnfollow.firstName,
      userToUnfollow.lastName,
      userToUnfollow.alias,
      userToUnfollow.imageUrl
    );

    const follow = new Follow(currentUser, targetUser);

    await this.followDao.delete(follow);
    await this.userDao.decrementFollowers(
      new UserData(
        targetUser.firstName,
        targetUser.lastName,
        targetUser.alias.slice(1),
        targetUser.imageUrl
      )
    );
    await this.userDao.decrementFollowees(
      new UserData(
        currentUser.firstName,
        currentUser.lastName,
        currentUser.alias.slice(1),
        currentUser.imageUrl
      )
    );

    const followerCount = await this.userService.getFollowerCount(
      token,
      userToUnfollow
    );
    const followeeCount = await this.userService.getFolloweeCount(
      token,
      userToUnfollow
    );

    return [followerCount, followeeCount];
  }

  protected async getFakeData(
    lastItem: UserDto | null,
    pageSize: number,
    userAlias: string
  ): Promise<[UserDto[], boolean]> {
    console.log("Getting fake data in server...\n");
    const [items, hasMore] = FakeData.instance.getPageOfUsers(
      User.fromDto(lastItem),
      pageSize,
      userAlias
    );
    const dtos = items.map((user) => user.dto);
    console.log(lastItem);
    console.log(User.fromDto(lastItem));
    return [dtos, hasMore];
  }
}
export default FollowService;
