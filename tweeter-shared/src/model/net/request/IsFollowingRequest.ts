import { UserDto } from "../../dto/UserDto";
import { TweeterRequest } from "./TweeterRequest";

export interface IsFollowingRequest extends TweeterRequest {
  readonly user: UserDto;
  readonly selectedUser: UserDto;
}
