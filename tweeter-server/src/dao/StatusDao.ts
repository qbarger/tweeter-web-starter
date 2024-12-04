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

export class StatusDao implements Dao<Status> {
  public async delete(request: Status): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async put(request: Status): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async get(request: Status): Promise<Status> {
    throw new Error("Method not implemented.");
  }
  public async update(request: Status): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async upload(url: string): Promise<void> {
    console.log("uploading in StatusDao...");
  }
}
