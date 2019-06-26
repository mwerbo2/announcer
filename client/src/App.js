import React, { Component } from "react";
import { Router, Route, withRouter } from "react-router-dom";
import "./index.css";
import Display from "./Components/Layout/LiveDisplay";
import DisplayEditor from "./Components/Layout/DisplayEditor";
import Profile from "./Components/Profile/Profile";
import WelcomeMain from "./Components/Welcome/WelcomeMain";
import Callback from "./Auth/Callback";
import auth0Client from "./Auth/Auth";
import history from "./Auth/history";

class App extends Component {
  state = {
    backgroundImage: "",
    opacity: 0
  };

  getOpacity = opa => {
    this.setState({ opacity: opa });
  };

  getBackground = updated => {
    this.setState({
      backgroundImage: updated.backgroundImage
    });
  };

  componentDidUpdate = (prevProps, prevState) => {};

  async componentDidMount() {
    if (this.props.location.pathname === "/callback") {
      this.setState({ checkingSession: false });
      return;
    }
    try {
      await auth0Client.silentAuth();
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
