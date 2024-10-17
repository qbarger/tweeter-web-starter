import { User, AuthToken } from "tweeter-shared";
import { AuthenticationPresenter, AuthenticationView } from "./AuthenticationPresenter";

export class RegisterPresenter extends AuthenticationPresenter {

    protected getUser(alias: string, password: string, rememberMe?: boolean | undefined, firstName?: string | undefined, lastName?: string, imageBytes?: Uint8Array, imageFileExtension?: string, originalUrl?: string): Promise<[User, AuthToken]> {
        return this.service.register(
          firstName!,
          lastName!,
          alias,
          password,
          imageBytes!,
          imageFileExtension!,
        )
    }

    protected getAction(): string {
      return "register user"
    }
}