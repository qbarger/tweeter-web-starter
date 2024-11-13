import { TweeterResponse } from "./TweeterResponse";

export interface IsFollowingResponse extends TweeterResponse {
  readonly isFollowing: boolean;
}
