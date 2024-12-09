import { User, Follow, Status } from "tweeter-shared";
import { Dao } from "./Dao";
import { DaoFactory } from "./DaoFactory";
import { S3Dao } from "./S3Dao";

export class S3DaoFactory extends DaoFactory<string> {
  getDao(): Dao<string> {
    return new S3Dao();
  }
}
