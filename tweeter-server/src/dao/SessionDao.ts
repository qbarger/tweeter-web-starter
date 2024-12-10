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

export class SessionDao implements Dao<string> {
  readonly tableName = "session";
  readonly token = "authtoken";
  readonly timestamp = "timestamp";

  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

  public async delete(request: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: this.generateTokenItem(request),
    };
    await this.client.send(new DeleteCommand(params));
  }
  public async put(request: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        [this.token]: request,
        [this.timestamp]: Date.now(),
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
    return output.Item == undefined ? undefined : output.Item.token.S;
  }

  private generateTokenItem(token: string) {
    return {
      [this.token]: token,
    };
  }
}
