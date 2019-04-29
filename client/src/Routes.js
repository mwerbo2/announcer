import React, { Component } from "react";
// import SplitEditor from './Components/SplitEditor';
import { Router, Route } from "react-router-dom";
import Display from "./Components/Layout/LiveDisplay";
import DisplayEditor from "./Components/Layout/DisplayEditor";
import Profile from "./Components/Profile/Profile";
import WelcomeMain from "./Components/Welcome/WelcomeMain";
import Callback from "./Auth/Callback";
import auth0Client from "./Auth/Auth";
import history from "./Auth/history";
import App from "./App";

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth0Client.handleAuthentication();
  }
};

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        {/* <Route path="/" render={(props) => <WelcomeMain auth={auth0Client} {...props} />}/> */}
        <Route path="/" render={(props) => <App auth={auth0Client} {...props} />}/>
        {/* <Route
          path="/welcome"
          render={props => <WelcomeMain auth={auth0Client} {...props} />}
        /> */}

        {/* <Route exact path="/edit" component={SplitEditor} /> */}
        <Route
          path="/display"
          render={props => <Display auth={auth0Client} {...props} />}
        />
        <Route
          path="/displayeditor"
          render={props => <DisplayEditor auth={auth0Client} {...props} />}
        />
        <Route
          path="/profile"
          render={props => <Profile auth={auth0Client} {...props} />}
        />
        <Route exact path="/callback" component={Callback} />
      </div>
    </Router>
  );
};
