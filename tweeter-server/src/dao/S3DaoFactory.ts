import { User, Follow, Status } from "tweeter-shared";
import { Dao } from "./Dao";
import { DaoFactory } from "./DaoFactory";
import { S3Dao } from "./s3Dao";

export class S3DaoFactory extends DaoFactory {
  getS3Dao(): Dao<string> {
    return new S3Dao();
  }
  getUserDao(): Dao<User> {
    throw new Error("Method not implemented.");
  }
  getFollowDao(): Dao<Follow> {
    throw new Error("Method not implemented.");
  }
  getStatusDao(): Dao<Status> {
    throw new Error("Method not implemented.");
  }
}
