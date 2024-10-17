import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import UserItemScroller from "./components/mainLayout/UserItemScroller";
import StatusItemScroller from "./components/mainLayout/StatusItemScroller";
import useUserInfo from "./components/userInfo/UserInfoHook";
import { FolloweePresenter } from "./presenters/FolloweePresenter";
import { UserItemView } from "./presenters/UserItemPresenter";
import { FollowerPresenter } from "./presenters/FollowerPresenter";
import { StatusItemView } from "./presenters/StatusItemPresenter";
import FeedPresenter from "./presenters/FeedPresenter";
import StoryPresenter from "./presenters/StoryPresenter";
import { LoginPresenter } from "./presenters/LoginPresenter";
import { AuthenticationView } from "./presenters/AuthenticationPresenter";
import ItemScroller from "./components/mainLayout/ItemScroller";
import { Status, User } from "tweeter-shared";
import StatusItem from "./components/statusItem/StatusItem";
import { PagedItemView } from "./presenters/PagedItemPresenter";
import UserItem from "./components/userItem/UserItem";

const App = () => {
  const { currentUser, authToken } = useUserInfo();

  const isAuthenticated = (): boolean => {
    return !!currentUser && !!authToken;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? (
          <AuthenticatedRoutes />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/feed" />} />
        <Route path="feed" element={
          <ItemScroller 
            key={1} 
            presenterGenerator={(view: PagedItemView<Status>) => new FeedPresenter(view)} 
            itemComponentGenerator={(item: Status) => <StatusItem status = {item} />} />
          } />
        <Route path="story" element={
          <ItemScroller 
            key={2}  
            presenterGenerator={(view: PagedItemView<Status>) => new StoryPresenter(view)} 
            itemComponentGenerator={(item: Status) => <StatusItem status={item} />} />
          } />
        <Route
          path="followees"
          element={
            <ItemScroller
              key={1}
                presenterGenerator={(view: PagedItemView<User>) => new FolloweePresenter(view)}
                itemComponentGenerator={(item: User) => <UserItem value={item} />} />
          } />
        <Route
          path="followers"
          element={
            <ItemScroller
              key={2} 
                presenterGenerator={(view: PagedItemView<User>) => new FollowerPresenter(view)}
                itemComponentGenerator={(item: User) => <UserItem value={item} />} />
          }
          />
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/feed" />} />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login presenterGenerator={(view: AuthenticationView) => new LoginPresenter(view)} />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login presenterGenerator={(view: AuthenticationView) => new LoginPresenter(view)} originalUrl={location.pathname} />} />
    </Routes>
  );
};

export default App;
