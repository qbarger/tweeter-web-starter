import { AuthToken, User } from "tweeter-shared";
import useUserInfo from "./UserInfoHook";

interface InfoListener {
    currentUser: User | null;
    displayedUser: User | null;
    authToken: AuthToken | null;
    updateUserInfo: (
        currentUser: User,
        displayedUser: User | null,
        authToken: AuthToken,
        remember: boolean
    ) => void;
    clearUserInfo: () => void;
    setDisplayedUser: (user: User) => void;
}

const useInfoListener = (): InfoListener => {
    const {updateUserInfo, clearUserInfo, setDisplayedUser} = useUserInfo()

    return (
        
    )
}

export default InfoListener