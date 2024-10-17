import { User, AuthToken } from "tweeter-shared";
import { LoginView, Presenter, View } from "./Presenter";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import UserService from "../model/service/UserService";

export interface AuthenticationView extends LoginView {
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
        alias: string, 
        password: string,
        rememberMe: boolean, 
        firstName?: string | undefined, 
        lastName?: string,  
        imageBytes?: Uint8Array, 
        imageFileExtension?: string,
        originalUrl?: string
    ){
        this.doFailureReportingOperation(async () => {
            this.view.setIsLoading(true);

            let [user, authToken] = await this.getUser(
                alias, 
                password,
                rememberMe, 
                firstName, 
                lastName,  
                imageBytes, 
                imageFileExtension,
                originalUrl
            );

            this.view.updateUserInfo(user, user, authToken, rememberMe);

            if (originalUrl) {
                this.navigate(originalUrl);
              } else {
                this.navigate("/");
              }
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
    protected abstract getUser(
        alias: string, 
        password: string,
        rememberMe: boolean, 
        firstName?: string | undefined, 
        lastName?: string,  
        imageBytes?: Uint8Array, 
        imageFileExtension?: string,
        originalUrl?: string): Promise<[User, AuthToken]>
}