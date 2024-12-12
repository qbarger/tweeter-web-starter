import { Follow, User, UserDto } from "tweeter-shared";
import { DataPage } from "../model/domain/DataPage";

export interface Dao<T> {
  delete(request: T): Promise<void>;
  put(request: T, input?: string, value?: number): Promise<void>;
  get(request: T): Promise<T | undefined>;
  update(request: T, input?: string): Promise<void>;
  upload(
    fileName: string,
    imageStringBase64Encoded: string,
    alias?: string
  ): Promise<string>;
  query(
    request: User,
    size: number,
    lasttime: number | undefined
  ): Promise<DataPage<T>>;
  incrementFollowers(request: T): Promise<void>;
  incrementFollowees(request: T): Promise<void>;
  decrementFollowers(request: T): Promise<void>;
  decrementFollowees(request: T): Promise<void>;
  queryFollowers(
    userAlias: string,
    size: number,
    lastUser?: string
  ): Promise<DataPage<Follow>>;
  queryFollowees(
    userAlias: string,
    size: number,
    lastUser?: string
  ): Promise<DataPage<Follow>>;
  batchGet(names: string[]): Promise<UserDto[]>;
}
