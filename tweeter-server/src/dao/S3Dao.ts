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
import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";
import { DataPage } from "../model/domain/DataPage";
import { User } from "tweeter-shared";

export class S3Dao implements Dao<string> {
  query(
    request: User,
    size: number,
    lasttime: number | undefined
  ): Promise<DataPage<string>> {
    throw new Error("Method not implemented.");
  }

  delete(request: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  put(request: string, input?: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  get(request: string): Promise<string | undefined> {
    throw new Error("Method not implemented.");
  }
  update(request: string, input?: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  incrementFollowers?(request: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  incrementFollowees?(request: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  decrementFollowers?(request: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  decrementFollowees?(request: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async upload(
    fileName: string,
    imageStringBase64Encoded: string,
    alias: string
  ): Promise<string> {
    let decodedImageBuffer: Buffer = Buffer.from(
      imageStringBase64Encoded,
      "base64"
    );
    fileName = alias + fileName;
    const BUCKET = "qb-cs340tweeterbucket";
    const REGION = "us-east-1";
    const s3Params = {
      Bucket: BUCKET,
      Key: "image/" + fileName,
      Body: decodedImageBuffer,
      ContentType: "image/png",
      ACL: ObjectCannedACL.public_read,
    };
    const c = new PutObjectCommand(s3Params);
    const client = new S3Client({ region: REGION });
    try {
      await client.send(c);
      return `https://${BUCKET}.s3.${REGION}.amazonaws.com/image/${fileName}`;
    } catch (error) {
      throw Error("s3 put image failed with: " + error);
    }
  }
}
