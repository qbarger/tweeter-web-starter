import { MemoryRouter } from "react-router-dom";
import PostStatus from "../../../src/components/postStatus/PostStatus";
import { render, screen } from "@testing-library/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { PostStatusPresenter } from "../../../src/presenters/PostStatusPresenter";
import { anything, instance, mock, verify } from "ts-mockito";
import useUserInfo from "../../../src/components/userInfo/UserInfoHook";
import { AuthToken, User } from "tweeter-shared";

jest.mock("../../../src/components/userInfo/UserInfoHook", () => ({
  ...jest.requireActual("../../../src/components/userInfo/UserInfoHook"),
  __esModule: true,
  default: jest.fn(),
}));

/*
describe("PostStatus Component", () => {
  let mockUserInstance: User = new User("f", "f", "f", "f");
  let mockAuthTokenInstance: AuthToken = new AuthToken("f", Date.now());

  beforeAll(() => {
    (useUserInfo as jest.Mock).mockReturnValue({
      currentUser: mockUserInstance,
      authToken: mockAuthTokenInstance,
    });
  });
  it("disables the Post Status and Clear buttons when first rendered", () => {
    const { postStatusButton, clearStatusButton } = renderAndGetElements();

    expect(postStatusButton).toBeDisabled();
    expect(clearStatusButton).toBeDisabled();
  });

  it("enables both buttons when the text field has text", async () => {
    const { postStatusText, postStatusButton, clearStatusButton, user } =
      renderAndGetElements();

    await user.type(postStatusText, "hey pal");

    expect(postStatusButton).toBeEnabled();
    expect(clearStatusButton).toBeEnabled();
  });

  it("disables both buttons when the text field is cleared", async () => {
    const { postStatusText, postStatusButton, clearStatusButton, user } =
      renderAndGetElements();

    await user.type(postStatusText, "hey pal");

    expect(postStatusButton).toBeEnabled();
    expect(clearStatusButton).toBeEnabled();

    await user.clear(postStatusText);

    expect(postStatusButton).toBeDisabled();
    expect(clearStatusButton).toBeDisabled();
  });

  /*
  it("calls presenter's postStatus method with correct parameters when the post status button is pressed", async () => {
    const mockPresenter = mock<PostStatusPresenter>();
    const mockPresenterInstance = instance(mockPresenter);
    const post: string = "Welcome to Good Burger, home of the good burger.";
    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as React.MouseEvent;

    const { postStatusText, postStatusButton, clearStatusButton, user } =
      renderAndGetElements();

    await user.type(postStatusText, post);
    await user.click(postStatusButton);

    verify(
      mockPresenterInstance.submitPost(
        mockEvent,
        post,
        mockUserInstance,
        mockAuthTokenInstance
      )
    ).once();
  });
});

const renderPostStatus = () => {
  return render(
    <MemoryRouter>
      <PostStatus />
    </MemoryRouter>
  );
};

const renderAndGetElements = () => {
  const user = userEvent.setup();

  renderPostStatus();

  const postStatusText = screen.getByLabelText("postStatusText");
  const postStatusButton = screen.getByRole("button", { name: "postStatus" });
  const clearStatusButton = screen.getByRole("button", { name: "clearStatus" });

  return { postStatusText, postStatusButton, clearStatusButton, user };
};
*/
