import { Follow, User, UserDto } from "tweeter-shared";
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
  batchGet(names: string[]): Promise<UserDto[]> {
    throw new Error("Method not implemented.");
  }

  query(
    request: User,
    size: number,
    lasttime: number | undefined
  ): Promise<DataPage<Follow>> {
    throw new Error("Method not implemented.");
  }

  incrementFollowers(request: Follow): Promise<void> {
    throw new Error("Method not implemented.");
  }
  incrementFollowees(request: Follow): Promise<void> {
    throw new Error("Method not implemented.");
  }
  decrementFollowers(request: Follow): Promise<void> {
    throw new Error("Method not implemented.");
  }
  decrementFollowees(request: Follow): Promise<void> {
    throw new Error("Method not implemented.");
  }
  readonly tableName = "follows";
  readonly indexName = "follows_index";
  readonly follower_alias = "follower_alias";
  readonly followee_alias = "followee_alias";

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
      },
    };
    await this.client.send(new PutCommand(params));
  }

  public async get(request: Follow): Promise<Follow | undefined> {
    if (!request.follower.alias || !request.followee.alias) {
      throw new Error("Follower or followee alias is missing.");
    }

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

  public async queryFollowers(
    userAlias: string,
    size: number,
    lastUser?: string
  ): Promise<DataPage<Follow>> {
    if (!userAlias) {
      throw new Error("Invalid user");
    }
    const params = {
      TableName: this.tableName,
      IndexName: this.indexName,
      KeyConditionExpression: `${this.followee_alias} = :a`,
      ExpressionAttributeValues: {
        ":a": userAlias,
      },
      Limit: size,
      ExclusiveStartKey: lastUser
        ? {
            [this.followee_alias]: userAlias,
            [this.follower_alias]: lastUser,
          }
        : undefined,
    };

    const items: Follow[] = [];
    try {
      const data = await this.client.send(new QueryCommand(params));

      if (!data) {
        return new DataPage<Follow>([], false);
      }

      const hasMorePages = data.LastEvaluatedKey !== undefined;

      if (data.Items) {
        for (const item of data.Items) {
          const user1 = new User("", "", item[this.follower_alias], "");
          const user2 = new User("", "", item[this.followee_alias], "");
          items.push(new Follow(user1, user2));
        }
      }

      return new DataPage<Follow>(items, hasMorePages);
    } catch (error) {
      console.error("Error querying followers:", error);
      throw new Error("Failed to fetch followers");
    }
  }

  public async queryFollowees(
    userAlias: string,
    size: number,
    lastUser?: string
  ): Promise<DataPage<Follow>> {
    if (!userAlias) {
      throw new Error("Invalid user");
    }
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: `${this.follower_alias} = :a`,
      ExpressionAttributeValues: {
        ":a": userAlias,
      },
      Limit: size,
      ExclusiveStartKey: lastUser
        ? {
            [this.follower_alias]: userAlias,
            [this.followee_alias]: lastUser,
          }
        : undefined,
    };

    const items: Follow[] = [];
    try {
      const data = await this.client.send(new QueryCommand(params));

      if (!data) {
        return new DataPage<Follow>([], false);
      }

      const hasMorePages = data.LastEvaluatedKey !== undefined;

      if (data.Items) {
        for (const item of data.Items) {
          const user1 = new User("", "", item[this.follower_alias], "");
          const user2 = new User("", "", item[this.followee_alias], "");
          items.push(new Follow(user1, user2));
        }
      }

      return new DataPage<Follow>(items, hasMorePages);
    } catch (error) {
      console.error("Error querying followees:", error);
      throw new Error("Failed to fetch followees");
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
