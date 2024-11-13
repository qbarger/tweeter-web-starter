import { TweeterRequest } from "../request/TweeterRequest";
import { TweeterResponse } from "./TweeterResponse";

export interface FollowTypeResponse extends TweeterResponse {
  readonly count: number;
}
