import { User, Follow, Status } from "tweeter-shared";
import { Dao } from "./Dao";
import { DaoFactory } from "./DaoFactory";
import { UserDao } from "./UserDao";

export class UserDaoFactory extends DaoFactory {
  getS3Dao(): Dao<string> {
    throw new Error("Method not implemented.");
  }
  getUserDao(): Dao<User> {
    return new UserDao();
  }
  getFollowDao(): Dao<Follow> {
    throw new Error("Method not implemented.");
  }
  getStatusDao(): Dao<Status> {
    throw new Error("Method not implemented.");
  }
}
