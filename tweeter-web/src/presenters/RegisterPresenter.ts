import { User, AuthToken } from "tweeter-shared";
import { AuthenticationPresenter } from "./AuthenticationPresenter";

export class RegisterPresenter extends AuthenticationPresenter {

    protected getUser(firstName: string, lastName: string, alias: string, password: string, imageBytes: Uint8Array, imageFileExtension: string): Promise<[User, AuthToken]> {
        return this.service.register(
          firstName,
          lastName,
          alias,
          password,
          imageBytes,
          imageFileExtension
        )
    }

    protected getAction(): string {
      return "register user"
    }
}