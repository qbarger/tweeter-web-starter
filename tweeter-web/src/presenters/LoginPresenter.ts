import { User, AuthToken } from "tweeter-shared";
import {
  AuthenticationPresenter,
  AuthenticationView,
} from "./AuthenticationPresenter";

export class LoginPresenter extends AuthenticationPresenter<AuthenticationView> {
  public getUser(
    alias: string,
    password: string,
    rememberMe: boolean | undefined
  ): Promise<[User, AuthToken]> {
    return this.service.login(alias, password);
  }

  protected getAction(): string {
    return "log user in";
  }
}
