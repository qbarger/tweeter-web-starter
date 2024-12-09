import { Dao } from "./Dao";
import { DaoFactory } from "./DaoFactory";
import { SessionDao } from "./SessionDao";

export class SessionDaoFactory extends DaoFactory<string> {
  getDao(): Dao<string> {
    return new SessionDao();
  }
}
