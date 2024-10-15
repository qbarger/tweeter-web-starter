import { AuthToken, User } from "tweeter-shared" 
import { Presenter, View } from "./Presenter";

export interface UserItemView extends View {
    addItems: (userItems: User[]) => void
}

export abstract class UserItemPresenter extends Presenter<UserItemView> {
    private _hasMoreItems = true;
    private _lastItem: User | null = null;

    protected constructor(view: UserItemView){
        super(view)
    }

    protected get lastItem() {
        return this._lastItem
    }
    
    protected set lastItem(value: User | null) {
        this._lastItem = value
    }

    public get hasMoreItems() {
        return this._hasMoreItems
    }

    protected set hasMoreItems(value: boolean) {
        this._hasMoreItems = value
    }

    reset() {
        this.lastItem = null
        this.hasMoreItems = true
    }

    public abstract loadMoreItems(authToken: AuthToken, userAlias: string): void
}
export default UserItemPresenter