import { Follow, User } from "tweeter-shared";
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
import { DataPage } from "../model/domain/DataPage";

export class FollowDao implements Dao<Follow> {
  query(
    request: User,
    size: number,
    lasttime: number | undefined
  ): Promise<DataPage<Follow>> {
    throw new Error("Method not implemented.");
  }

  incrementFollowers?(request: Follow): Promise<void> {
    throw new Error("Method not implemented.");
  }
  incrementFollowees?(request: Follow): Promise<void> {
    throw new Error("Method not implemented.");
  }
  decrementFollowers?(request: Follow): Promise<void> {
    throw new Error("Method not implemented.");
  }
  decrementFollowees?(request: Follow): Promise<void> {
    throw new Error("Method not implemented.");
  }
  readonly tableName = "follows";
  readonly indexName = "follows_index";
  readonly follower_alias = "follower_alias";
  readonly follower_name = "follower_name";
  readonly followee_alias = "followee_alias";
  readonly followee_name = "followee_name";

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
        [this.follower_alias]: request.follower.alias,
        [this.followee_alias]: request.followee.alias,
        [this.follower_name]: request.follower.name,
        [this.followee_name]: request.followee.name,
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
    if (output.Item === undefined) {
      return undefined;
    } else {
      return new Follow(output.Item.follower, output.Item.followee);
    }
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
      [this.follower_alias]: request.follower.alias,
      [this.followee_alias]: request.followee.alias,
    };
  }
}
