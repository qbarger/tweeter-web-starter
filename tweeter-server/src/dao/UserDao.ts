import { User } from "tweeter-shared";
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

export class UserDao implements Dao<User> {
  readonly tableName = "users";
  readonly user = "user";
  readonly followerCount = "follower_count";
  readonly followeeCount = "followee_count";

  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

  public async delete(request: User): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: this.generateUserItem(request),
    };
    await this.client.send(new DeleteCommand(params));
  }

  public async put(request: User): Promise<void> {
    const initial: number = 0;
    const params = {
      TableName: this.tableName,
      Item: {
        [this.user]: request.alias,
        [this.followerCount]: initial,
        [this.followeeCount]: initial,
      },
    };
    await this.client.send(new PutCommand(params));
  }

  public async get(request: User): Promise<User | undefined> {
    const params = {
      TableName: this.tableName,
      Key: this.generateUserItem(request),
    };
    const output = await this.client.send(new GetCommand(params));
    return output.Item == undefined
      ? undefined
      : new User(
          output.Item.firstName,
          output.Item.lastName,
          output.Item.alias,
          output.Item.imageFileExtension
        );
  }

  public async update(request: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async upload(
    fileName: string,
    imageStringBase64Encoded: string
  ): Promise<string> {
    throw new Error("Method not implemented.");
  }

  public async incrementFollowers(request: User): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: this.generateUserItem(request),
      ExpressionAttributeValues: { ":inc": 1 },
      UpdateExpression:
        "SET " + this.followerCount + " = " + this.followerCount + " + :inc",
    };
    await this.client.send(new UpdateCommand(params));
  }

  public async incrementFollowees(request: User): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: this.generateUserItem(request),
      ExpressionAttributeValues: { ":inc": 1 },
      UpdateExpression:
        "SET " + this.followeeCount + " = " + this.followeeCount + " + :inc",
    };
    await this.client.send(new UpdateCommand(params));
  }

  public async decrementFollowers(request: User): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: this.generateUserItem(request),
      ExpressionAttributeValues: { ":dec": -1 },
      UpdateExpression:
        "SET " + this.followerCount + " = " + this.followerCount + " + :dec",
    };
    await this.client.send(new UpdateCommand(params));
  }

  public async decrementFollowees(request: User): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: this.generateUserItem(request),
      ExpressionAttributeValues: { ":dec": -1 },
      UpdateExpression:
        "SET " + this.followeeCount + " = " + this.followeeCount + " + :dec",
    };
    await this.client.send(new UpdateCommand(params));
  }

  private generateUserItem(user: User) {
    return {
      [this.user]: user.alias,
    };
  }
}
