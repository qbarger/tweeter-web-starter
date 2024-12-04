import { Follow } from "tweeter-shared";
import { Dao } from "./Dao";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export class FollowDao implements Dao<Follow> {
  readonly tableName = "follows";
  readonly indexName = "follows_index";
  readonly followerAttr = "follower_handle";
  readonly followernameAttr = "follower_name";
  readonly followeeAttr = "followee_handle";
  readonly followeenameAttr = "followee_name";

  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

  public async delete(request: Follow): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async put(request: Follow): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async get(request: Follow): Promise<Follow> {
    throw new Error("Method not implemented.");
  }
  public async update(request: Follow): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async upload(url: string): Promise<void> {
    console.log("uploading in FollowDao...");
  }
}
