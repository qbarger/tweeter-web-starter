import { AuthenticationResponse, LoginRequest } from "tweeter-shared";
import UserService from "../../model/service/UserService";

export const handler = async (
  request: LoginRequest
): Promise<AuthenticationResponse> => {
  const userService: UserService = new UserService();
  const response = await userService.login(request.alias, request.password);
  return {
    success: true,
    message: null,
    user: response[0],
    authToken: response[1],
  };
};
