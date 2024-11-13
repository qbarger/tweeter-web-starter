import { AuthToken, TweeterRequest } from "tweeter-shared";
import UserService from "../model/service/UserService";
import { Presenter, View } from "./Presenter";

export interface LogoutView extends View {
  displayInfoMessage: (
    message: string,
    duration: number,
    bootstrapClasses?: string
  ) => void;
  clearLastInfoMessage: () => void;
  clearUserInfo: () => void;
}

export class LogoutPresenter extends Presenter<LogoutView> {
  private _userService: UserService | null = null;

  public constructor(view: LogoutView) {
    super(view);
  }

  public get userService() {
    if (this._userService == null) {
      this._userService = new UserService();
    }
    return this._userService;
  }

  public async logOut(authToken: AuthToken | null): Promise<void> {
    try {
      this.view.displayInfoMessage("Logging Out...", 0);
      const request: TweeterRequest = {
        token: authToken?.token ?? "",
      };
      await this.userService.logout(request);

      this.view.clearLastInfoMessage();
      this.view.clearUserInfo();
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to log user out because of exception: ${error}`
      );
    }
  }
}
