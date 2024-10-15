import { AuthToken, User } from "tweeter-shared";
import UserService from "../model/service/UserService";
import { Presenter, View } from "./Presenter";
import UserInfoProvider from "../components/userInfo/UserInfoProvider";

export interface UserInfoView extends View {
    setIsFollower: React.Dispatch<React.SetStateAction<boolean>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    clearLastInfoMessage: () => void
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string) => void
    setFolloweeCount: React.Dispatch<React.SetStateAction<number>>
    setFollowerCount: React.Dispatch<React.SetStateAction<number>>
}

export class UserInfoPresenter extends Presenter<UserInfoView> {
    private userService: UserService

    public constructor(view: UserInfoView){
        super(view)
        this.userService = new UserService()
    }

    public async followDisplayedUser (
        event: React.MouseEvent,
        displayedUser: User | null, 
        authToken: AuthToken, 
      ): Promise<void> {
        event.preventDefault();
    
        try {
          this.view.setIsLoading(true);
          this.view.displayInfoMessage(`Following ${displayedUser!.name}...`, 0);
    
          const [followerCount, followeeCount] = await this.userService.follow(
            authToken!,
            displayedUser!
          );
    
          this.view.setIsFollower(true);
          this.view.setFollowerCount(followerCount);
          this.view.setFolloweeCount(followeeCount);
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to follow user because of exception: ${error}`
          );
        } finally {
          this.view.clearLastInfoMessage();
          this.view.setIsLoading(false);
        }
      };

      public async unfollowDisplayedUser (
        event: React.MouseEvent,
        displayedUser: User | null,
        authToken: AuthToken
      ): Promise<void> {
        event.preventDefault();
    
        try {
          this.view.setIsLoading(true);
          this.view.displayInfoMessage(
            `Unfollowing ${displayedUser!.name}...`,
            0
          );
    
          const [followerCount, followeeCount] = await this.userService.unfollow(
            authToken!,
            displayedUser!
          );
    
          this.view.setIsFollower(false);
          this.view.setFollowerCount(followerCount);
          this.view.setFolloweeCount(followeeCount);
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to unfollow user because of exception: ${error}`
          );
        } finally {
          this.view.clearLastInfoMessage();
          this.view.setIsLoading(false);
        }
      };
    
      public async setNumbFollowers (
        authToken: AuthToken,
        displayedUser: User
      ) {
        try {
          this.view.setFollowerCount(await this.userService.getFollowerCount(authToken, displayedUser));
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to get followers count because of exception: ${error}`
          );
        }
      };
      public async setNumbFollowees (
        authToken: AuthToken,
        displayedUser: User
      ) {
        try {
          this.view.setFolloweeCount(await this.userService.getFolloweeCount(authToken, displayedUser));
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to get followees count because of exception: ${error}`
          );
        }
      };

      public async setIsFollowerStatus (
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User
      ) {
        try {
          if (currentUser === displayedUser) {
            this.view.setIsFollower(false);
          } else {
            this.view.setIsFollower(
              await this.userService.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
            );
          }
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to determine follower status because of exception: ${error}`
          );
        }
      };
}