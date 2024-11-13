import { FollowTypeRequest, FollowTypeResponse } from "tweeter-shared";
import UserService from "../../model/service/UserService";

export const handler = async (
  request: FollowTypeRequest
): Promise<FollowTypeResponse> => {
  const userService: UserService = new UserService();
  const response = await userService.getFollowerCount(
    request.token,
    request.user
  );
  return {
    success: true,
    message: null,
    count: response,
  };
};
