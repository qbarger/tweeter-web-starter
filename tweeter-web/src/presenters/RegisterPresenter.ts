import { User, AuthToken, RegisterRequest } from "tweeter-shared";
import {
  AuthenticationPresenter,
  AuthenticationView,
} from "./AuthenticationPresenter";
import { Buffer } from "buffer";

export interface RegisterView extends AuthenticationView {
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setImageBytes: React.Dispatch<React.SetStateAction<Uint8Array>>;
  setImageFileExtension: React.Dispatch<React.SetStateAction<string>>;
}

export class RegisterPresenter extends AuthenticationPresenter<RegisterView> {
  public constructor(view: RegisterView) {
    super(view);
  }

  public async getUser(
    alias: string,
    password: string,
    rememberMe: boolean | undefined,
    firstName?: string | undefined,
    lastName?: string,
    imageBytes?: Uint8Array,
    imageFileExtension?: string,
    originalUrl?: string
  ): Promise<[User, AuthToken]> {
    console.log("getUser being called");
    const imageStringBase64: string = Buffer.from(
      imageBytes ?? new Uint8Array()
    ).toString("base64");
    const request: RegisterRequest = {
      token: "",
      alias: alias,
      password: password,
      firstname: firstName ?? "",
      lastname: lastName ?? "",
      userImageBytes: imageStringBase64,
      imageFileExtension: imageFileExtension ?? "",
    };
    const [user, authToken] = await this.service.register(request);
    return [user, authToken];
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
  }

  public getFileExtension(file: File): string | undefined {
    return file.name.split(".").pop();
  }

  protected getAction(): string {
    return "register user";
  }
}
