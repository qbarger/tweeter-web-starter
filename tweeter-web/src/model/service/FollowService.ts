import { AuthToken, User, FakeData } from "tweeter-shared";

export class FollowService {
    public async loadMoreFollowers (
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
      ): Promise<[User[], boolean]> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getPageOfUsers(lastItem, pageSize, user.alias);
      };
    
      public async loadMoreFollowees (
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
      ): Promise<[User[], boolean]> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.getPageOfUsers(lastItem, pageSize, user.alias);
      };
}
export default FollowService