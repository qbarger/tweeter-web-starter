import { Dao } from "./Dao";
import { UserDaoFactory } from "./UserDaoFactory";
import { FollowDaoFactory } from "./FollowDaoFactory";
import { S3DaoFactory } from "./S3DaoFactory";
import { StoryDaoFactory } from "./StoryDaoFactory";
import { FeedDaoFactory } from "./FeedDaoFactory";
import { SessionDaoFactory } from "./SessionDaoFactory";

export abstract class DaoFactory<T> {
  abstract getDao(): Dao<T>;

  public getDaoFactory(type: string): DaoFactory<any> {
    switch (type) {
      case "user":
        return new UserDaoFactory();
      case "follow":
        return new FollowDaoFactory();
      case "story":
        return new StoryDaoFactory();
      case "feed":
        return new FeedDaoFactory();
      case "s3":
        return new S3DaoFactory();
      case "session":
        return new SessionDaoFactory();
      default:
        throw new Error("No factory type given...");
    }
  }
}
