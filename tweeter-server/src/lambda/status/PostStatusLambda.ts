import StatusService from "../../model/service/StatusService";
import { PostStatusRequest, TweeterResponse } from "tweeter-shared";

export const handler = async (
  request: PostStatusRequest
): Promise<TweeterResponse> => {
  const statusService: StatusService = new StatusService();
  await statusService.postStatus(request.token, request.status);
  return {
    success: true,
    message: null,
  };
};
