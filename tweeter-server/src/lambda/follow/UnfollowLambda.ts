import { FollowNumResponse, FollowTypeRequest } from "tweeter-shared";
import FollowService from "../../model/service/FollowService";

export const handler = async (
  request: FollowTypeRequest
): Promise<FollowNumResponse> => {
  const followService: FollowService = new FollowService();
  const response = await followService.unfollow(request.token, request.user);
  return {
    success: true,
    message: null,
    followerCount: response[0],
    followeeCount: response[1],
  };
};
