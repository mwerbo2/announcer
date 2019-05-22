import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
        domain: `${process.env.REACT_APP_Auth0_Domain}`,
        audience: `https://${process.env.REACT_APP_Auth0_Domain}/userinfo`,
        clientID: `${process.env.REACT_APP_Auth0_ClientId}`,
        redirectUri: `http://docker01/callback`,
        responseType: `id_token`,
        scope: `openid profile`,
        sso: false
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.setSession = this.setSession.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    console.log('a.js 37 logging in')
    this.auth0.authorize();
  }
  
  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    })
  }

  setSession(authResult) {
    localStorage.setItem('isLoggedIn', 'true');
    this.acccessToke = authResult.accessToken
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    // set the time that the id token will expire at
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
  }

  signOut() {
    this.acccessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    localStorage.removeItem('isLoggedIn')

    this.auth0.logout({
      returnTo: `http://docker01/`,
      clientID: `${process.env.REACT_APP_Auth0_ClientId}`,
    });
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;
