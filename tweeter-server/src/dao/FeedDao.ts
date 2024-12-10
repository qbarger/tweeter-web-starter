import { Status } from "tweeter-shared";
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
import { StatusDaoHelper } from "./StatusDaoHelper";

export class FeedDao extends StatusDaoHelper implements Dao<Status> {
  readonly tableName = "feed";
  readonly receiver = "receiver_alias";
  readonly timestamp = "timestamp";

  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

  public async delete(request: Status): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: this.generateStatusItem(request),
    };
    await this.client.send(new DeleteCommand(params));
  }
  public async put(request: Status): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        [this.receiver]: request.user.alias,
        [this.timestamp]: request.timestamp,
      },
    };
    await this.client.send(new PutCommand(params));
  }
  public async get(request: Status): Promise<Status | undefined> {
    const params = {
      TableName: this.tableName,
      Key: this.generateStatusItem(request),
    };
    const output = await this.client.send(new GetCommand(params));
    if (output.Item === undefined) {
      return undefined;
    } else {
      return new Status(
        output.Item.post,
        output.Item.user,
        output.Item.timestamp
      );
    }
  }
  update(request: Status): Promise<void> {
    throw new Error("Method not implemented.");
  }
  upload(fileName: string, imageStringBase64Encoded: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
