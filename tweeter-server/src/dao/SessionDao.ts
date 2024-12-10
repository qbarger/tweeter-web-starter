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
import { AuthToken } from "tweeter-shared";

export class SessionDao implements Dao<string> {
  update(request: string, input?: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  readonly tableName = "sessions";
  readonly authtoken = "authtoken";
  readonly timestamp = "timestamp";
  readonly expiresAt = "expiresAt";

  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

  public async delete(request: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: this.generateTokenItem(request),
    };
    await this.client.send(new DeleteCommand(params));
  }
  public async put(
    request: string,
    input: string,
    timestamp: number
  ): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        [this.authtoken]: request,
        [this.timestamp]: timestamp,
        [this.expiresAt]: Math.floor(timestamp / 1000) + 600,
      },
    };
    await this.client.send(new PutCommand(params));
  }
  public async get(request: string): Promise<string | undefined> {
    const params = {
      TableName: this.tableName,
      Key: this.generateTokenItem(request),
    };
    const output = await this.client.send(new GetCommand(params));

    if (!output.Item) {
      throw new Error("Authtoken missing...");
    }

    return output.Item == undefined ? undefined : output.Item.authtoken;
  }

  private generateTokenItem(token: string) {
    return {
      [this.authtoken]: token,
    };
  }
}
