const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.Auth0Domain}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: `${process.env.Auth0ClientId}`,
  issuer: `https://${process.env.Auth0Domain}/`,
  algorithms: ["RS256"]
});

export default checkJwt;
