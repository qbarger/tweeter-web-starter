import { TweeterRequest } from "../request/TweeterRequest";
import { TweeterResponse } from "./TweeterResponse";

export interface FollowNumResponse extends TweeterResponse {
  readonly followerCount: number;
  readonly followeeCount: number;
}
