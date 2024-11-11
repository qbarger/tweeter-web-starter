import { AuthToken, PostStatusRequest, Status, User } from "tweeter-shared";
import StatusService from "../model/service/StatusService";
import { MessageView, Presenter } from "./Presenter";

export interface PostStatusView extends MessageView {
  setPost: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export class PostStatusPresenter extends Presenter<PostStatusView> {
  private _statusService: StatusService | null = null;
  private _post: string = "";
  private _isLoading: boolean = false;

  public constructor(view: PostStatusView) {
    super(view);
    //this.statusService = new StatusService();
  }

  public get statusService() {
    if (this._statusService == null) {
      this._statusService = new StatusService();
    }
    return this._statusService;
  }

  protected set isLoading(value: boolean) {
    this._isLoading = value;
  }

  protected get isLoading() {
    return this._isLoading;
  }

  protected set post(value: string) {
    this._post = value;
  }

  protected get post() {
    return this._post;
  }

  public async submitPost(
    event: React.MouseEvent,
    post: string,
    currentUser: User,
    authToken: AuthToken
  ) {
    const request: PostStatusRequest = {
      token: authToken?.token,
      status: new Status(post, currentUser, Date.now()),
    };
    this.view.setIsLoading(true);
    this.view.displayInfoMessage("Posting status...", 0);
    await this.statusService.postStatus(request);
    this.view.setPost("");
    this.view.displayInfoMessage("Status posted!", 2000);
    this.view.clearLastInfoMessage();
    this.view.setIsLoading(false);
  }

  public clearPost(event: React.MouseEvent) {
    event.preventDefault();
    this.view.setPost("");
  }
}
