import { Follow } from "tweeter-shared";
import { Dao } from "./Dao";
import { DaoFactory } from "./DaoFactory";
import { FollowDao } from "./FollowDao";

export class FollowDaoFactory extends DaoFactory<Follow> {
  getDao(): Dao<Follow> {
    return new FollowDao();
  }
}
