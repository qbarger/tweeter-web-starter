import { AuthToken, Status, User } from "tweeter-shared";
import StatusService from "../model/service/StatusService";
import { MessageView, Presenter, View } from "./Presenter";

export interface PostStatusView extends MessageView {
    setPost: React.Dispatch<React.SetStateAction<string>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export class PostStatusPresenter extends Presenter<PostStatusView> {
     private statusService: StatusService
     private _post: string = ""
     private _isLoading: boolean = false

     public constructor(view: PostStatusView){
      super(view)
      this.statusService = new StatusService()
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
          this.view.setIsLoading(true)
          this.view.displayInfoMessage("Posting status...", 0);
    
          const status = new Status(post, currentUser!, Date.now());
    
          await this.statusService.postStatus(authToken!, status);
    
          this.view.setPost("")
          this.view.displayInfoMessage("Status posted!", 2000);
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to post the status because of exception: ${error}`
          );
        } finally {
          this.view.clearLastInfoMessage();
          this.view.setIsLoading(false)
        }
      };

}