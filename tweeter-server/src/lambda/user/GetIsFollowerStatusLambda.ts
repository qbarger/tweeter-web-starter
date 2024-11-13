import { IsFollowingRequest, IsFollowingResponse } from "tweeter-shared";
import UserService from "../../model/service/UserService";

export const handler = async (
  request: IsFollowingRequest
): Promise<IsFollowingResponse> => {
  const userService: UserService = new UserService();
  const response = await userService.getIsFollowerStatus(
    request.token,
    request.user,
    request.selectedUser
  );
  return {
    success: true,
    message: null,
    isFollowing: response,
  };
};
