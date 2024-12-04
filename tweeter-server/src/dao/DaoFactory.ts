import { Follow, Status, User } from "tweeter-shared";
import { Dao } from "./Dao";
import { UserDaoFactory } from "./UserDaoFactory";
import { FollowDaoFactory } from "./FollowDaoFactory";
import { StatusDaoFactory } from "./StatusDaoFactory";
import { S3DaoFactory } from "./S3DaoFactory";

export abstract class DaoFactory {
  abstract getUserDao(): Dao<User>;
  abstract getFollowDao(): Dao<Follow>;
  abstract getStatusDao(): Dao<Status>;
  abstract getS3Dao(): Dao<string>;

  public getDaoFactory(type: string): DaoFactory {
    switch (type) {
      case "user":
        return new UserDaoFactory();
      case "follow":
        return new FollowDaoFactory();
      case "status":
        return new StatusDaoFactory();
      case "s3":
        return new S3DaoFactory();
      default:
        throw new Error("No factory type given...");
    }
  }
}
