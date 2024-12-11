import { Status, User } from "tweeter-shared";
import { Dao } from "./Dao";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient, QueryCommandInput } from "@aws-sdk/client-dynamodb";
import { StatusDaoHelper } from "./StatusDaoHelper";
import { DataPage } from "../model/domain/DataPage";

export class StoryDao extends StatusDaoHelper implements Dao<Status> {
  readonly tableName = "story";
  readonly author_alias = "author_alias";
  readonly timestamp = "timestamp";
  readonly post = "post";
  readonly firstname = "firstname";
  readonly lastname = "lastname";
  readonly imageUrl = "imageUrl";

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
        [this.author]: request.user.alias,
        [this.timestamp]: request.timestamp,
        [this.post]: request.post,
        [this.firstname]: request.user.firstName,
        [this.lastname]: request.user.lastName,
        [this.imageUrl]: request.user.imageUrl,
      },
    };
    await this.client.send(new PutCommand(params));
  }
  public async query(
    request: User,
    size: number,
    lasttime: number | undefined
  ): Promise<DataPage<Status>> {
    const params = {
      KeyConditionExpression: `${this.author_alias} = :a`,
      ExpressionAttributeValues: {
        ":a": request.alias,
      },
      TableName: this.tableName,
      Limit: size,
      ExclusiveStartKey: lasttime
        ? {
            [this.author_alias]: request.alias,
            [this.timestamp]: lasttime,
          }
        : undefined,
    };

    const items: Status[] = [];
    try {
      const data = await this.client.send(new QueryCommand(params));

      const hasMorePages = data.LastEvaluatedKey !== undefined;

      if (data.Items) {
        for (const item of data.Items) {
          const userAlias = item[this.author_alias] || "";
          const postContent = item[this.post] || "";
          const timestamp = Number(item[this.timestamp]);
          const firstName = item[this.firstname] || "";
          const lastName = item[this.lastname] || "";
          const url = item[this.imageUrl] || "";

          const user = new User(firstName, lastName, userAlias, url);
          items.push(new Status(postContent, user, timestamp));
        }
      }

      return new DataPage<Status>(items.reverse(), hasMorePages);
    } catch (error) {
      console.error("Error querying posts:", error);
      throw new Error("Failed to fetch posts");
    }
  }

  public async update(request: Status): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async upload(
    fileName: string,
    imageStringBase64Encoded: string
  ): Promise<string> {
    throw new Error("Method not implemented.");
  }
  incrementFollowers(request: Status): Promise<void> {
    throw new Error("Method not implemented.");
  }
  incrementFollowees(request: Status): Promise<void> {
    throw new Error("Method not implemented.");
  }
  decrementFollowers(request: Status): Promise<void> {
    throw new Error("Method not implemented.");
  }
  decrementFollowees(request: Status): Promise<void> {
    throw new Error("Method not implemented.");
  }
  get(request: Status): Promise<Status | undefined> {
    throw new Error("Method not implemented.");
  }
}
