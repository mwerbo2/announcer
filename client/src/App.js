import React, { Component } from "react";
import SplitEditor from "./Components/SplitEditor";
import {
  Router,
  Route,
  withRouter,
  Link,
  Switch
} from "react-router-dom";
import './index.css'
import { Header, Button, Grid, Segment } from "semantic-ui-react";
// import {Link, Router, withRouter} from 'react-router-dom'
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import Display from "./Components/Layout/LiveDisplay";
import DisplayEditor from "./Components/Layout/DisplayEditor";
import Profile from "./Components/Profile/Profile";
import WelcomeMain from "./Components/Welcome/WelcomeMain";
import Callback from "./Auth/Callback";
import auth0Client from "./Auth/Auth";
import history from "./Auth/history";

class App extends Component {
  state = {backgroundImage: ""}

  getBackground = updated => {
    console.log("app.js 50", updated);
    console.log("app.js 51", this.props);
    
    // this.setState({
    //   backgroundColor: color,
    //   backgroundImage: img
    // })
    this.setState({
      backgroundImage: updated.backgroundImage
    });
    console.log('app.js 35', this.state)
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log(this.props)
    if (this.state.backgroundImage !== prevState.backgroundImage) {
      console.log('state upda')
      // this.setState({backgroundImage: this.})
      // this.getBackground()
    } 

    console.log("**app.js 39", this.state.backgroundImage)
  }
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

  async componentDidMount(){
    if (this.props.location.pathname === '/callback') {
    this.setState({checkingSession: false});
    return
  };
    try {
      await auth0Client.silentAuth();
      // this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false});

    
  }
  render() {
    return (
        <Router history={history}>
        <div>
        <Route path="/" exact render={props => <WelcomeMain auth={auth0Client} {...props}/>}/>
        <Route path="/display" render={props => <Display auth={auth0Client} bk={this.state.backgroundImage} {...props} />}/>
        <Route path="/displayeditor" render={props => <DisplayEditor auth={auth0Client} didBackgroundUpdate={this.getBackground} {...props} />}/>
        <Route path="/profile" render={props => <Profile auth={auth0Client} bk={this.state.backgroundImage} {...props} />}/>
        <Route exact path="/callback" component={Callback} />
        </div>
        </Router>
    );
  }
}

export default withRouter(App);
