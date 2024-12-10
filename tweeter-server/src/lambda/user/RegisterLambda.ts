import { AuthenticationResponse, RegisterRequest, User } from "tweeter-shared";
import UserService from "../../model/service/UserService";

export const handler = async (
  request: RegisterRequest
): Promise<AuthenticationResponse> => {
  const userService: UserService = new UserService();
  const uint8array = Uint8Array.from(
    Buffer.from(request.userImageBytes, "base64")
  );
  const response = await userService.register(
    request.firstname,
    request.lastname,
    request.alias,
    request.password,
    request.userImageBytes,
    request.imageFileExtension
  );
  return {
    success: true,
    message: null,
    user: response[0],
    authToken: response[1],
  };
};
