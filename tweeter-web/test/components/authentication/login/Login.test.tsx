import { MemoryRouter } from "react-router-dom";
import Login from "../../../../src/components/authentication/login/Login";
import { render, screen } from "@testing-library/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { LoginPresenter } from "../../../../src/presenters/LoginPresenter";
import { anything, instance, mock, verify } from "ts-mockito";

library.add(fab);

describe("Login Component", () => {
  it("When first rendered the sign-in button is disabled", () => {
    const { signInButton } = renderAndGetElements("/");
    expect(signInButton).toBeDisabled();
  });

  it("enables sign-in button when both the alias and password fields have been filled", async () => {
    const { signInButton, aliasField, passwordField, user } =
      renderAndGetElements("/");

    await user.type(aliasField, "a");
    await user.type(passwordField, "b");

    expect(signInButton).toBeEnabled();
  });

  it("disables the sign-in button if either the alias or password field is cleared", async () => {
    const { signInButton, aliasField, passwordField, user } =
      renderAndGetElements("/");

    await user.type(aliasField, "a");
    await user.type(passwordField, "b");
    expect(signInButton).toBeEnabled();

    await user.clear(aliasField);
    expect(signInButton).toBeDisabled();

    await user.type(aliasField, "a");
    expect(signInButton).toBeEnabled();

    await user.clear(passwordField);
    expect(signInButton).toBeDisabled();
  });

  it("calls presenter's login method is with correct parameters when the sign-in button is pressed", async () => {
    const mockPresenter = mock<LoginPresenter>();
    const mockPresenterInstance = instance(mockPresenter);
    const originalUrl = "/";
    const alias = "a";
    const password = "b";

    const { signInButton, aliasField, passwordField, user } =
      renderAndGetElements(originalUrl, mockPresenterInstance);

    await user.type(aliasField, alias);
    await user.type(passwordField, password);
    await user.click(signInButton);

    verify(mockPresenter.loadUser(alias, password, anything(), originalUrl));
  });
});

const renderLogin = (originalUrl: string, presenter?: LoginPresenter) => {
  return render(
    <MemoryRouter>
      {!!presenter ? (
        <Login originalUrl={originalUrl} presenter={presenter} />
      ) : (
        <Login originalUrl={originalUrl} />
      )}
    </MemoryRouter>
  );
};

const renderAndGetElements = (
  originalUrl: string,
  presenter?: LoginPresenter
) => {
  const user = userEvent.setup();

  renderLogin(originalUrl);

  const signInButton = screen.getByRole("button", { name: /Sign in/i });
  const aliasField = screen.getByLabelText("alias");
  const passwordField = screen.getByLabelText("password");

  return { signInButton, aliasField, passwordField, user };
};
