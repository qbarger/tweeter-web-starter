import { User, AuthToken } from "tweeter-shared";
import UserService from "../model/service/UserService";
import { Buffer } from "buffer";
import { Presenter, View } from "./Presenter";
import { useNavigate } from "react-router-dom";

export interface RegisterView extends View {
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setImageUrl: React.Dispatch<React.SetStateAction<string>>
    setImageBytes: React.Dispatch<React.SetStateAction<Uint8Array>>
    setImageFileExtension: React.Dispatch<React.SetStateAction<string>>
}

export class RegisterPresenter extends Presenter<RegisterView> {
    private userService: UserService
    navigate = useNavigate()

    public constructor(view: RegisterView){
        super(view)
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

    public handleImageFile(file: File | undefined) { 
        if (file) {
          this.view.setImageUrl(URL.createObjectURL(file));
    
          const reader = new FileReader();
          reader.onload = (event: ProgressEvent<FileReader>) => {
            const imageStringBase64 = event.target?.result as string;
    
            // Remove unnecessary file metadata from the start of the string.
            const imageStringBase64BufferContents =
              imageStringBase64.split("base64,")[1];
    
            const bytes: Uint8Array = Buffer.from(
              imageStringBase64BufferContents,
              "base64"
            );
    
            this.view.setImageBytes(bytes);
          };
          reader.readAsDataURL(file);
    
          // Set image file extension (and move to a separate method)
          const fileExtension = this.getFileExtension(file);
          if (fileExtension) {
            this.view.setImageFileExtension(fileExtension);
          }
        } else {
          this.view.setImageUrl("");
          this.view.setImageBytes(new Uint8Array());
        }
    };

    public getFileExtension(file: File): string | undefined {
        return file.name.split(".").pop();
      };
}