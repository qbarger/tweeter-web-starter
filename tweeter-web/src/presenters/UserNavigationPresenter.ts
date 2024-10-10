import { AuthToken, User } from "tweeter-shared";
import UserService from "../model/service/UserService";
import useUserInfo from "../components/userInfo/UserInfoHook";
import useToastListener from "../components/toaster/ToastListenerHook";

export interface UserNavigationView {
    displayErrorMessage: (message: string, bootstrapClasses?: string) => void
    setDisplayedUser: (user: User) => void
}

export class UserNavigationPresenter {
    private userService: UserService
    private view: UserNavigationView

    public constructor(view: UserNavigationView){
        this.userService = new UserService()
        this.view = view
    }

    public async navigateToUser(event: React.MouseEvent, authToken: AuthToken | null, currentUser: User | null): Promise<void> {
        event.preventDefault();
    
        try {
          const alias = this.extractAlias(event.target.toString());
    
          const user = await this.userService.getUser(authToken!, alias);
    
          if (!!user) {
            if (currentUser!.equals(user)) {
              this.view.setDisplayedUser(currentUser!);
            } else {
              this.view.setDisplayedUser(user);
            }
          }
        } catch (error) {
          this.view.displayErrorMessage(`Failed to get user because of exception: ${error}`);
        }
      };

      public extractAlias = (value: string): string => {
        const index = value.indexOf("@");
        return value.substring(index);
      };
}