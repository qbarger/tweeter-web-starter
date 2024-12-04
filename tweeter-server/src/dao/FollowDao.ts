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
  readonly followerAttr = "follower_alias";
  readonly followernameAttr = "follower_name";
  readonly followeeAttr = "followee_alias";
  readonly followeenameAttr = "followee_name";

  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

  public async delete(request: Follow): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: this.generateFollowItem(request),
    };
    await this.client.send(new DeleteCommand(params));
  }

  public async put(request: Follow): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        [this.followerAttr]: request.follower.alias,
        [this.followeeAttr]: request.followee.alias,
        [this.followernameAttr]: request.follower.name,
        [this.followeenameAttr]: request.followee.name,
      },
    };
    await this.client.send(new PutCommand(params));
  }

  public async get(request: Follow): Promise<Follow | undefined> {
    const params = {
      TableName: this.tableName,
      Key: this.generateFollowItem(request),
    };
    const output = await this.client.send(new GetCommand(params));
    return output.Item == undefined
      ? undefined
      : new Follow(output.Item.follower, output.Item.followee);
  }

  public async update(request: Follow): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async upload(
    fileName: string,
    imageStringBase64Encoded: string
  ): Promise<string> {
    throw new Error("Method not implemented.");
  }

  private generateFollowItem(request: Follow) {
    return {
      [this.followerAttr]: request.follower,
      [this.followeeAttr]: request.followee,
    };
  }
}
