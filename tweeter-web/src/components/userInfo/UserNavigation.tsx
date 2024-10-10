import { AuthToken, FakeData, User } from "tweeter-shared";
import useUserInfo from "./UserInfoHook";
import useToastListener from "../toaster/ToastListenerHook";
import { UserNavigationPresenter, UserNavigationView } from "../../presenters/UserNavigationPresenter";
import React, { useState } from "react";

const useUserNavigation = () => {
    const { displayErrorMessage } = useToastListener();
    const { setDisplayedUser, currentUser, authToken } = useUserInfo();

    /*
    const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
        event.preventDefault();
    
        try {
          const alias = extractAlias(event.target.toString());
    
          const user = await getUser(authToken!, alias);
    
          if (!!user) {
            if (currentUser!.equals(user)) {
              setDisplayedUser(currentUser!);
            } else {
              setDisplayedUser(user);
            }
          }
        } catch (error) {
          displayErrorMessage(`Failed to get user because of exception: ${error}`);
        }
      };
      */

      /*
      const extractAlias = (value: string): string => {
        const index = value.indexOf("@");
        return value.substring(index);
      };
      */
    
      /*
      const getUser = async (
        authToken: AuthToken,
        alias: string
      ): Promise<User | null> => {
        // TODO: Replace with the result of calling server
        return FakeData.instance.findUserByAlias(alias);
      };
      */
    const listener: UserNavigationView = {
      displayErrorMessage: displayErrorMessage,
      setDisplayedUser: setDisplayedUser
    }

    const presenter = new UserNavigationPresenter(listener)

    const navigateToUser = async (event: React.MouseEvent) =>{ 
      await presenter.navigateToUser(event, authToken, currentUser)
    }
    return navigateToUser
}

export default useUserNavigation