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
import { AuthToken, User } from "tweeter-shared";
import { DataPage } from "../model/domain/DataPage";

export class SessionDao implements Dao<[string, string]> {
  incrementFollowers(request: [string, string]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  incrementFollowees(request: [string, string]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  decrementFollowers(request: [string, string]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  decrementFollowees(request: [string, string]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  query(
    request: User,
    size: number,
    lasttime: number | undefined
  ): Promise<DataPage<[string, string]>> {
    throw new Error("Method not implemented.");
  }
  upload(fileName: string, imageStringBase64Encoded: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  update(request: [string, string]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  readonly tableName = "sessions";
  readonly authtoken = "authtoken";
  readonly timestamp = "timestamp";
  readonly user = "user";
  readonly expiresAt = "expiresAt";

  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

  public async delete(request: [string, string]): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: this.generateTokenItem(request[0]),
    };
    await this.client.send(new DeleteCommand(params));
  }
  public async put(
    request: [string, string],
    input: string,
    timestamp: number
  ): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        [this.authtoken]: request[0],
        [this.timestamp]: timestamp,
        [this.user]: request[1],
        [this.expiresAt]: Math.floor(timestamp / 1000) + 600,
      },
    };
    await this.client.send(new PutCommand(params));
  }
  public async get(
    request: [string, string]
  ): Promise<[string, string] | undefined> {
    const params = {
      TableName: this.tableName,
      Key: this.generateTokenItem(request[0]),
    };
    const output = await this.client.send(new GetCommand(params));

    if (!output.Item) {
      throw new Error("Authtoken missing...");
    }

    return output.Item == undefined
      ? undefined
      : [output.Item.authtoken, output.Item.user];
  }

  private generateTokenItem(token: string) {
    return {
      [this.authtoken]: token,
    };
  }
}
