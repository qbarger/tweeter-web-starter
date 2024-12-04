import { User, Follow, Status } from "tweeter-shared";
import { Dao } from "./Dao";
import { DaoFactory } from "./DaoFactory";
import { UserDao } from "./UserDao";

export class UserDaoFactory extends DaoFactory<User> {
  getDao(): Dao<User> {
    return new UserDao();
  }
}
