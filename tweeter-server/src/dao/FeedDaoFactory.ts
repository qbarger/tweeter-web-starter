import { Status } from "tweeter-shared";
import { Dao } from "./Dao";
import { DaoFactory } from "./DaoFactory";
import { FeedDao } from "./FeedDao";

export class FeedDaoFactory extends DaoFactory<Status> {
  getDao(): Dao<Status> {
    return new FeedDao();
  }
}
