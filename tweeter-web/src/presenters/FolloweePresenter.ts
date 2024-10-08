import FollowService from "../model/FollowService";
import UserItemPresenter, { UserItemView } from "./UserItemPresenter";

export class FolloweePresenter extends UserItemPresenter {
    private followService: FollowService

    public constructor(view: UserItemView) {
        super(view)
        this.followService = new FollowService()
    }
}