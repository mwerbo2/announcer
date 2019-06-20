import React, { Component } from "react";
import { Router, Route, withRouter, Redirect } from "react-router-dom";
import "./index.css";
import Display from "./Components/Layout/LiveDisplay";
import DisplayEditor from "./Components/Layout/DisplayEditor";
import Profile from "./Components/Profile/Profile";
import WelcomeMain from "./Components/Welcome/WelcomeMain";
import Callback from "./Auth/Callback";
import auth0Client from "./Auth/Auth";
import history from "./Auth/history";
import NavBar from "./Components/Layout/Navbar";
import SecuredRoute from "./Auth/SecuredRoute";
import { toast } from "react-semantic-toasts";

class App extends Component {
  state = {
    backgroundImage: "",
    opacity: 0
  };

  getOpacity = opa => {
    console.log("this gotOPacity");
    this.setState({ opacity: opa });
    // console.log("app.js 21", this.state.opacity);
  };

  getBackground = updated => {
    this.setState({
      backgroundImage: updated.backgroundImage
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log(this.state.opacity);
    console.log("comp did update", prevState);
    console.log(this.state.opacity !== prevState.opacity);
    if (this.state.opacity !== prevState.opacity) {
      // this.getOpacity();
      console.log("update opa in", this.state.opacity);
    }
    // if (this.state.backgroundImage !== prevState.backgroundImage) {
    // this.setState({backgroundImage: this.})
    // this.getBackground()
    // }
  };
  // state={checkingSession: true}

  // goTo(route) {
  //   this.props.history.replace(`/${route}`);
  // }

  // login() {
  //   this.props.auth.login();
  // }

  // logout() {
  //   this.props.auth.logOut();
  // }
  // componentDidMount() {
  //   const { renewSession } = this.props.auth;

  //   if (localStorage.getItem("isLoggedIn") === "true") {
  //     renewSession();
  //   }
  // }

  async componentDidMount() {
    if (this.props.location.pathname === "/callback") {
      this.setState({ checkingSession: false });
      return;
    }
    try {
      await auth0Client.silentAuth();
      // this.forceUpdate();
    } catch (err) {
      if (err.error !== "login_required") console.log(err.error);
    }
    this.setState({ checkingSession: false });
  }
  render() {
    return (
      <div style={{ height: "100vh" }}>
        <Router history={history}>
          <div>
            <Route
              path="/"
              exact
              render={props => <WelcomeMain auth={auth0Client} {...props} />}
            />
            <Route
              path="/display"
              render={props => (
                <Display
                  auth={auth0Client}
                  bk={this.state.backgroundImage}
                  opacity={this.state.opacity}
                  {...props}
                />
              )}
            />
            <Route
              path="/displayeditor"
              render={props =>
                !auth0Client.isAuthenticated() ? (
                  auth0Client.signIn()
                ) : (
                  <DisplayEditor
                    auth={auth0Client}
                    didBackgroundUpdate={this.getBackground}
                    didOpacityUpdate={this.getOpacity}
                    opacity={this.state.opacity}
                    {...props}
                  />
                )
              }
            />
            <Route
              path="/profile"
              render={props => (
                <Profile
                  auth={auth0Client}
                  bk={this.state.backgroundImage}
                  {...props}
                />
              )}
            />
            <Route exact path="/callback" component={Callback} />
          </div>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);
