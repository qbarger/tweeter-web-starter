import { User, Follow, Status } from "tweeter-shared";
import { Dao } from "./Dao";
import { DaoFactory } from "./DaoFactory";
import { FollowDao } from "./FollowDao";

export class FollowDaoFactory extends DaoFactory {
  getS3Dao(): Dao<string> {
    throw new Error("Method not implemented.");
  }
  getUserDao(): Dao<User> {
    throw new Error("Method not implemented.");
  }
  getFollowDao(): Dao<Follow> {
    return new FollowDao();
  }
  getStatusDao(): Dao<Status> {
    throw new Error("Method not implemented.");
  }
}
