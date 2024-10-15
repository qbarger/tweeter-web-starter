import { AuthToken, Status } from "tweeter-shared"
import { Presenter, View } from "./Presenter"

export interface StatusItemView extends View {
    addItems: (statusItems: Status[]) => void 
}

export abstract class StatusItemPresenter extends Presenter<StatusItemView> {
    private _hasMoreItems: boolean = true
    private _lastItem: Status | null = null
    
    protected constructor(view: StatusItemView){
        super(view)
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
