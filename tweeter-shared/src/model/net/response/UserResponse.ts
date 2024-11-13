import { UserDto } from "../../dto/UserDto";
import { TweeterRequest } from "../request/TweeterRequest";
import { TweeterResponse } from "./TweeterResponse";

export interface UserResponse extends TweeterResponse {
  readonly user: UserDto | null;
}
