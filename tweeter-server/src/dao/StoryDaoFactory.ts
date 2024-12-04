import { User, Follow, Status } from "tweeter-shared";
import { Dao } from "./Dao";
import { DaoFactory } from "./DaoFactory";
import { StoryDao } from "./StoryDao";

export class StoryDaoFactory extends DaoFactory<Status> {
  getDao(): Dao<Status> {
    return new StoryDao();
  }
}
