import { AuthToken, User } from "tweeter-shared";
import useUserInfo from "./UserInfoHook";

interface UserNavigation {
    updateUserDetails: (
        currentUser: User,
        displayedUser: User | null,
        authToken: AuthToken,
        remember: boolean
    ) => void;
    clearUserDetails: () => void;
    setCurrentUser: (user: User) => void;
}

const useUserNavigation = (): UserNavigation => {
    const {updateUserInfo, clearUserInfo, setDisplayedUser} = useUserInfo()

    return {
        updateUserDetails: updateUserInfo,
        clearUserDetails: clearUserInfo,
        setCurrentUser: setDisplayedUser
    }
}

export default useUserNavigation