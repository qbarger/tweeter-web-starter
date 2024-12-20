import { AuthTokenDto } from "../../dto/AuthTokenDto";
import { UserDto } from "../../dto/UserDto";
import { TweeterResponse } from "./TweeterResponse";

export interface AuthenticationResponse extends TweeterResponse {
  readonly user: UserDto | null;
  readonly authToken: AuthTokenDto | null;
}
