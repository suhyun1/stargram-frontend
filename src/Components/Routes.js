import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect} from "react-router-dom";
import Auth from "../Routes/Auth/AuthContainer";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search";
import Profile from "../Routes/Profile";
import EditProfile from "../Routes/EditProfile";
import Hashtag from "../Routes/Hashtag";
import FullPhoto from "../Routes/FullPhoto";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/explore" component={Explore} />
    <Route path="/tags/:tag" component={Hashtag} />
    <Route path="/search" component={Search} />
    <Route path="/editProfile" component={EditProfile} />
    <Route path="/post/:postId" component={FullPhoto} />
    <Route path="/:username" component={Profile} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({isLoggedIn}) => 
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};
export default AppRouter;