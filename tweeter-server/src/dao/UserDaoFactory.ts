import { User, Follow, Status } from "tweeter-shared";
import { Dao } from "./Dao";
import { DaoFactory } from "./DaoFactory";
import { UserDao } from "./UserDao";
import { UserData } from "../model/domain/UserData";

export class UserDaoFactory extends DaoFactory<UserData> {
  getDao(): Dao<UserData> {
    return new UserDao();
  }
}
