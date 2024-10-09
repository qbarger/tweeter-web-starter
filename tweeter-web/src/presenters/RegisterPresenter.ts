import { User, AuthToken } from "tweeter-shared";
import UserService from "../model/service/UserService";
import { useNavigate } from "react-router-dom";

export interface RegisterView {
    displayErrorMessage: (message: string, bootstrapClasses?: string) => void
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export class RegisterPresenter {
    private view: RegisterView
    private userService: UserService
    navigate = useNavigate()

    public constructor(view: RegisterView){
        this.view = view
        this.userService = new UserService()
    }

    public async doRegister ( 
        rememberMe: boolean, 
        firstName: string, 
        lastName: string, 
        alias: string, 
        password: string, 
        imageBytes: Uint8Array, 
        imageFileExtension: string) {
        try {
        this.view.setIsLoading(true);

        const [user, authToken] = await this.userService.register(
            firstName,
            lastName,
            alias,
            password,
            imageBytes,
            imageFileExtension
        );

        this.view.updateUserInfo(user, user, authToken, rememberMe);
        this.navigate("/");
        } catch (error) {
        this.view.displayErrorMessage(
            `Failed to register user because of exception: ${error}`
        );
        } finally {
        this.view.setIsLoading(false);
        }
    };
}