import { Dao } from "./Dao";

export abstract class DaoFactory<T> {
  abstract getDao(): Dao<T>;
}
