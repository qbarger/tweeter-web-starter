import { User, AuthToken } from "tweeter-shared";
import UserService from "../model/service/UserService";
import { useNavigate } from "react-router-dom";

export interface LoginView {
    displayErrorMessage: (message: string, bootstrapClasses?: string) => void
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void
}

export class LoginPresenter {
    private userService: UserService
    private view: LoginView
    navigate = useNavigate()
    
    public constructor(view: LoginView){
        this.view = view
        this.userService = new UserService()
    }

    public async doLogin(alias: string, password: string, rememberMe: boolean, originalUrl: string) {
        try {
          this.view.setIsLoading(true);
    
          const [user, authToken] = await this.userService.login(alias, password);
    
          this.view.updateUserInfo(user, user, authToken, rememberMe);
    
          if (originalUrl) {
            this.navigate(originalUrl);
          } else {
            this.navigate("/");
          }
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to log user in because of exception: ${error}`
          );
        } finally {
          this.view.setIsLoading(false);
        }
      };
}