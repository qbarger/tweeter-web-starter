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
  public async delete(request: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async put(request: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async get(request: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  public async update(request: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async upload(url: string): Promise<void> {
    console.log("uploading in UserDao...");
  }
}
