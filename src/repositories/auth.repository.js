var repository = {
  clients: [{
    id: 'application',
    clientId: 'clientid',
    clientSecret: 'clientsecret',
    grants: [
      'password',
      'refresh_token',
      'client_credentials'

    ],
    redirectUris: []
  }],
  tokens: [],
  users: [{
    username: 'angelos',
    password: 'password'
  },
  {
    username: 'pillos',
    password: 'password'
  }]
};

export function getAccessToken(token) {
  console.log('getAccessToken called and token is: ', token);
  var tokens = repository.tokens.filter(function (savedToken) {
    return savedToken.accessToken === token;
  });
  return tokens[0];
};

export function getClient(clientId, clientSecret) {
  console.log('getClient called and clientId is: ', clientId);
  var clients = repository.clients.filter(function (client) {
    return client.clientId === clientId && client.clientSecret === clientSecret;
  });
  return clients[0];
};

export function grantTypeAllowed(clientID, grantType) {
  console.log('grantTypeAllowed called and clientID is: ', clientID,
    ' and grantType is: ', grantType);
  return true;
}

export function getUser(username, password) {
  console.log('getUser() called and username is: ', username,
    ' and password is: ', password);
  var users = repository.users.filter(function (user) {
    return user.username === username && user.password === password;
  });
  return users[0];
};

export function saveToken(token, client, user) {
  console.log('saveToken() called and accessToken is: ', token,
    ' and clientID is: ', client,
    ' and user is: ', user)
  token.client = {
    id: client.clientId
  };
  token.user = {
    id: user.username || user.clientId
  };
  repository.tokens.push(token);
  return token;
};