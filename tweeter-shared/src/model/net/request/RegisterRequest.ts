import { LoginRequest } from "./LoginRequest";

export interface RegisterRequest extends LoginRequest {
  readonly firstname: string;
  readonly lastname: string;
  readonly userImageBytes: string;
  readonly imageFileExtension: string;
}
