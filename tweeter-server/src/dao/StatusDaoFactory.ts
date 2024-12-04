import { User, Follow, Status } from "tweeter-shared";
import { Dao } from "./Dao";
import { DaoFactory } from "./DaoFactory";
import { StatusDao } from "./StatusDao";

export class StatusDaoFactory extends DaoFactory {
  getS3Dao(): Dao<string> {
    throw new Error("Method not implemented.");
  }
  getUserDao(): Dao<User> {
    throw new Error("Method not implemented.");
  }
  getFollowDao(): Dao<Follow> {
    throw new Error("Method not implemented.");
  }
  getStatusDao(): Dao<Status> {
    return new StatusDao();
  }
}
