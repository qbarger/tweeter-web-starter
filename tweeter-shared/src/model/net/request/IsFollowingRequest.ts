import { UserDto } from "../../dto/UserDto";
import { TweeterRequest } from "./TweeterRequest";

export interface IsFollowingRequest extends TweeterRequest {
  user: UserDto;
  selectedUser: UserDto;
}
