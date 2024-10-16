import { User, AuthToken } from "tweeter-shared";
import { Presenter, View } from "./Presenter";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import UserService from "../model/service/UserService";

export interface AuthenticationView extends View {
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    setImageUrl: React.Dispatch<React.SetStateAction<string>>
    setImageBytes: React.Dispatch<React.SetStateAction<Uint8Array>>
    setImageFileExtension: React.Dispatch<React.SetStateAction<string>>
}

export abstract class AuthenticationPresenter extends Presenter<AuthenticationView> {
    navigate = useNavigate()
    protected service: UserService

    public constructor(view: AuthenticationView){
        super(view)
        this.service = new UserService()
    }

    public async loadUser(
        rememberMe: boolean, 
        firstName: string, 
        lastName: string, 
        alias: string, 
        password: string, 
        imageBytes: Uint8Array, 
        imageFileExtension: string
    ){
        this.doFailureReportingOperation(async () => {
            this.view.setIsLoading(true);

            let [user, authToken] = await this.getUser(
                firstName,
                lastName,
                alias,
                password,
                imageBytes,
                imageFileExtension
            );

            this.view.updateUserInfo(user, user, authToken, rememberMe);
            this.navigate("/");
        }, this.getAction())
    }

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

    protected abstract getAction(): string
    protected abstract getUser(firstName: string, lastName: string, alias: string, password: string, imageBytes: Uint8Array, imageFileExtension: string): Promise<[User, AuthToken]>
}