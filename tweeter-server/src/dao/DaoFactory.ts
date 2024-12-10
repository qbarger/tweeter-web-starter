import { Dao } from "./Dao";

export abstract class DaoFactory<T, U> {
  abstract getDao(): Dao<T, U>;
}
