import { User } from "tweeter-shared" 
import { PagedItemPresenter, PagedItemView } from "./PagedItemPresenter";
import FollowService from "../model/service/FollowService";

export interface UserItemView extends PagedItemView<User> {
    addItems: (userItems: User[]) => void
}

export abstract class UserItemPresenter extends PagedItemPresenter<User, FollowService> {
    protected createService(): FollowService {
        return new FollowService()
    }
}
export default UserItemPresenter