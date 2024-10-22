import { AuthToken } from "tweeter-shared";
import {
  LogoutPresenter,
  LogoutView,
} from "../../src/presenters/LogoutPresenter";
import {
  mock,
  instance,
  verify,
  spy,
  when,
  anything,
  capture,
} from "ts-mockito";
import UserService from "../../src/model/service/UserService";

describe("LogoutPresenter", () => {
  let mockLogoutPresenterView: LogoutView;
  let logoutPresenter: LogoutPresenter;
  let mockUserService: UserService;

  const authToken = new AuthToken("IEatRocks456", Date.now());

  beforeEach(() => {
    mockLogoutPresenterView = mock<LogoutView>();
    const mockLogoutPresenterViewInstance = instance(mockLogoutPresenterView);

    const logoutPresenterSpy = spy(
      new LogoutPresenter(mockLogoutPresenterViewInstance)
    );
    logoutPresenter = instance(logoutPresenterSpy);

    mockUserService = mock<UserService>();
    const mockUserServiceInstance = instance(mockUserService);

    when(logoutPresenterSpy.userService).thenReturn(mockUserServiceInstance);
  });

  it("tells the view to display a logging out message", async () => {
    await logoutPresenter.logOut(authToken);

    verify(
      mockLogoutPresenterView.displayInfoMessage("Logging Out...", 0)
    ).once();
  });

  it("calls logout on the user service with the correct authtoken", async () => {
    await logoutPresenter.logOut(authToken);
    verify(mockUserService.logout(authToken)).once();

    let [capturedAuthToken] = capture(mockUserService.logout).last();
    expect(capturedAuthToken).toEqual(authToken);
  });

  it("tells the view to clear the last info message and clear the user info", async () => {
    await logoutPresenter.logOut(authToken);
    verify(mockLogoutPresenterView.clearLastInfoMessage()).once();
    verify(mockLogoutPresenterView.clearUserInfo()).once();
    verify(mockLogoutPresenterView.displayErrorMessage(anything())).never();
  });

  it("displays an error message and does not clear the last info message and clear the user info", async () => {
    const error = new Error("error occured");
    when(mockUserService.logout(authToken)).thenThrow(error);

    await logoutPresenter.logOut(authToken);

    let [capturedErrorMessage] = capture(
      mockLogoutPresenterView.displayErrorMessage
    ).last();
    console.log(capturedErrorMessage);

    verify(
      mockLogoutPresenterView.displayErrorMessage(
        "Failed to log user out because of exception: Error: error occured"
      )
    ).once();
    verify(mockLogoutPresenterView.clearLastInfoMessage()).never();
    verify(mockLogoutPresenterView.clearUserInfo()).never();
  });
});
