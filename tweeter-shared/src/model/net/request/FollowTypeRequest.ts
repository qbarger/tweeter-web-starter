import { UserDto } from "../../dto/UserDto";
import { TweeterRequest } from "./TweeterRequest";

export interface FollowTypeRequest extends TweeterRequest {
  readonly user: UserDto;
}
