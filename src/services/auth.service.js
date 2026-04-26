import OAuth2Server from 'oauth2-server';
import { UnauthorizeError, AuthTokenExpiredError } from '../utils'
import { AuthenticateSuccessDto } from '../dtos'

var oauth2 = new OAuth2Server({
  model: require('../repositories/auth.repository'),
  accessTokenLifetime: 60 * 60,
  allowBearerTokensInQueryString: true
});

async function generateTokenClassic(req, res, next) {
  req.headers["content-type"] = "application/x-www-form-urlencoded";
  req.body.client_id = "clientid";
  req.body.client_secret = "clientsecret";
  req.body.grant_type = "password";
  var request = new OAuth2Server.Request(req);
  var response = new OAuth2Server.Response(res);
  try {
    const token = await oauth2.token(request, response);
    var authenticateResponse = new AuthenticateSuccessDto(token.accessToken, token.accessTokenExpiresAt);
    res.json(authenticateResponse);
  }
  catch (err) {
    next(new UnauthorizeError());
  }
}

async function generateTokenOAuth2(req, res, next) {
  var request = new OAuth2Server.Request(req);
  var response = new OAuth2Server.Response(res);
  try {
    const token = await oauth2.token(request, response);
    var authenticateResponse = new AuthenticateSuccessDto(token.accessToken, token.accessTokenExpiresAt);
    res.json(authenticateResponse);
  }
  catch (err) {
    next(new UnauthorizeError());
  }
}

async function authenticateToken(req, res, next) {
  var request = new OAuth2Server.Request(req);
  var response = new OAuth2Server.Response(res);
  if (!req.headers['authorization']) {
    next(new UnauthorizeError())
  } else {
    try {
      const token = await oauth2.authenticate(request, response);
      res.locals.token = token;
      next();
    }
    catch (err) {
      next(new AuthTokenExpiredError());
    }
  }
}

export const authService = {
  generateTokenClassic,
  generateTokenOAuth2,
  authenticateToken
};