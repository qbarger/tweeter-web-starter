import { AuthToken, Status } from "tweeter-shared"

export interface StatusItemView {
    addItems: (statusItems: Status[]) => void
    displayErrorMessage: (message: string) => void
}

export abstract class StatusItemPresenter {
    private _hasMoreItems: boolean = true
    private _lastItem: Status | null = null
    private _view: StatusItemView
    
    protected constructor(view: StatusItemView){
        this._view = view
    }

    protected get view(){
        return this._view
    }

    protected set hasMoreItems(value: boolean){
        this._hasMoreItems = value
    }

    public get hasMoreItems(){
        return this._hasMoreItems
    }

    protected set lastItem(value: Status | null){
        this._lastItem = value
    }

    protected get lastItem(){
        return this._lastItem
    }

    reset(){
        this._lastItem = null
        this._hasMoreItems = true
    }

    public abstract loadMoreItems(authToken: AuthToken, userAlias: string): void
}
