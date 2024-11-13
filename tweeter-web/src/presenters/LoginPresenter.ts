import { User, AuthToken, LoginRequest } from "tweeter-shared";
import {
  AuthenticationPresenter,
  AuthenticationView,
} from "./AuthenticationPresenter";

export class LoginPresenter extends AuthenticationPresenter<AuthenticationView> {
  public async getUser(
    alias: string,
    password: string,
    rememberMe: boolean | undefined
  ): Promise<[User, AuthToken]> {
    console.log("getUser being called");
    const request: LoginRequest = {
      token: "",
      alias: alias,
      password: password,
    };
    const [user, authToken] = await this.service.login(request);
    return [user, authToken];
  }

  protected getAction(): string {
    return "log user in";
  }
}
