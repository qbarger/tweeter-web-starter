import { AuthToken, Status, User } from "tweeter-shared";
import StatusService from "../model/service/StatusService";

export interface PostStatusView {
    displayErrorMessage: (message: string, bootstrapClasses?: string) => void
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string) => void
    clearLastInfoMessage: () => void
    setPost: React.Dispatch<React.SetStateAction<string>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export class PostStatusPresenter {
     private statusService: StatusService
     private _post: string = ""
     private _isLoading: boolean = false
     private _view: PostStatusView

     public constructor(view: PostStatusView){
        this.statusService = new StatusService()
        this._view = view
     }

     protected get view(){
        return this._view
     }

     protected set isLoading(value: boolean){
        this._isLoading = value
     }

     protected get isLoading(){
        return this._isLoading
     }

     protected set post(value: string){
        this._post = value
     }

     protected get post(){
        return this._post
     }
 
     public async submitPost (event: React.MouseEvent, post: string, currentUser: User | null, authToken: AuthToken | null) {
        event.preventDefault();
    
        try {
          this._view.setIsLoading(true)
          this._view.displayInfoMessage("Posting status...", 0);
    
          const status = new Status(post, currentUser!, Date.now());
    
          await this.statusService.postStatus(authToken!, status);
    
          this._view.setPost("")
          this._view.displayInfoMessage("Status posted!", 2000);
        } catch (error) {
          this._view.displayErrorMessage(
            `Failed to post the status because of exception: ${error}`
          );
        } finally {
          this._view.clearLastInfoMessage();
          this._view.setIsLoading(false)
        }
      };

}