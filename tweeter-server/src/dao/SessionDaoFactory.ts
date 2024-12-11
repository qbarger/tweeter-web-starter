import { Dao } from "./Dao";
import { DaoFactory } from "./DaoFactory";
import { SessionDao } from "./SessionDao";

export class SessionDaoFactory extends DaoFactory<[string, string]> {
  getDao(): Dao<[string, string]> {
    return new SessionDao();
  }
}
