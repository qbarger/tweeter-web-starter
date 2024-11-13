import { AuthToken, User, UserRequest } from "tweeter-shared";
import UserService from "../model/service/UserService";
import { Presenter, View } from "./Presenter";

export interface UserNavigationView extends View {
  setDisplayedUser: (user: User) => void;
}

export class UserNavigationPresenter extends Presenter<UserNavigationView> {
  private userService: UserService;

  public constructor(view: UserNavigationView) {
    super(view);
    this.userService = new UserService();
  }

  public async navigateToUser(
    event: React.MouseEvent,
    authToken: AuthToken | null,
    currentUser: User | null
  ): Promise<void> {
    event.preventDefault();
    try {
      const alias = this.extractAlias(event.target.toString());

      const request: UserRequest = {
        token: authToken?.token ?? "",
        alias: alias,
      };

      const response = await this.userService.getUser(request);
      if (!!response) {
        if (currentUser!.equals(response)) {
          this.view.setDisplayedUser(currentUser!);
        } else {
          this.view.setDisplayedUser(response);
        }
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to get user because of exception: ${error}`
      );
    }
  }

  public extractAlias = (value: string): string => {
    const index = value.indexOf("@");
    return value.substring(index);
  };
}
