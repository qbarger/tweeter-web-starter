import { Dao } from "./Dao";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UserData } from "../model/domain/UserData";
import { DataPage } from "../model/domain/DataPage";
import { User } from "tweeter-shared";

export class UserDao implements Dao<UserData> {
  readonly tableName = "users";
  readonly user = "user";
  readonly follower_count = "follower_count";
  readonly followee_count = "followee_count";

  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

  query(
    request: User,
    size: number,
    lasttime: number | undefined
  ): Promise<DataPage<UserData>> {
    throw new Error("Method not implemented.");
  }

  public async delete(request: UserData): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: this.generateUserItem(request),
    };
    await this.client.send(new DeleteCommand(params));
  }

  public async put(request: UserData, password: string): Promise<void> {
    const initial: number = 0;
    const params = {
      TableName: this.tableName,
      Item: {
        [this.user]: "@" + request.alias,
        firstName: request.firstName,
        lastName: request.lastName,
        password: password,
        imageUrl: request.imageUrl,
        [this.follower_count]: initial,
        [this.followee_count]: initial,
      },
    };
    await this.client.send(new PutCommand(params));
  }

  public async get(request: UserData): Promise<UserData | undefined> {
    const params = {
      TableName: this.tableName,
      Key: this.generateUserItem(request),
    };
    const output = await this.client.send(new GetCommand(params));

    if (output.Item === undefined) {
      return undefined;
    } else {
      return new UserData(
        output.Item.firstName,
        output.Item.lastName,
        output.Item.user,
        output.Item.imageUrl,
        output.Item.follower_count,
        output.Item.followee_count,
        output.Item.password
      );
    }
  }

  public async incrementFollowers(request: UserData): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: this.generateUserItem(request),
      ExpressionAttributeValues: { ":inc": 1 },
      UpdateExpression:
        "SET " + this.follower_count + " = " + this.follower_count + " + :inc",
    };
    await this.client.send(new UpdateCommand(params));
  }

  public async incrementFollowees(request: UserData): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: this.generateUserItem(request),
      ExpressionAttributeValues: { ":inc": 1 },
      UpdateExpression:
        "SET " + this.followee_count + " = " + this.followee_count + " + :inc",
    };
    await this.client.send(new UpdateCommand(params));
  }

  public async decrementFollowers(request: UserData): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: this.generateUserItem(request),
      ExpressionAttributeValues: { ":dec": -1 },
      UpdateExpression:
        "SET " + this.follower_count + " = " + this.follower_count + " + :dec",
    };
    await this.client.send(new UpdateCommand(params));
  }

  public async decrementFollowees(request: UserData): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: this.generateUserItem(request),
      ExpressionAttributeValues: { ":dec": -1 },
      UpdateExpression:
        "SET " + this.followee_count + " = " + this.followee_count + " + :dec",
    };
    await this.client.send(new UpdateCommand(params));
  }

  update(request: UserData, input?: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  upload(fileName: string, imageStringBase64Encoded: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  private generateUserItem(user: UserData) {
    return {
      [this.user]: "@" + user.alias,
    };
  }
}
