import { AuthToken, User } from "tweeter-shared"

export interface UserItemView {
    addItems: (userItems: User[]) => void
    displayErrorMessage: (message: string) => void
}

export abstract class UserItemPresenter {
    private _hasMoreItems = true;
    private _lastItem: User | null = null;

    private _view: UserItemView

    protected constructor(view: UserItemView){
        this._view = view
    }

    protected get view() {
        return this._view
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