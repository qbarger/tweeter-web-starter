import { TweeterRequest, TweeterResponse } from "tweeter-shared";
import UserService from "../../model/service/UserService";

export const handler = async (
  request: TweeterRequest
): Promise<TweeterResponse> => {
  const userService: UserService = new UserService();
  const response = await userService.logout(request.token);
  return {
    success: true,
    message: null,
  };
};
