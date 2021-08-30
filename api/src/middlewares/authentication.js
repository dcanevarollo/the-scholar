require('dotenv').config();

function isAuthenticated(req) {
  const { authorization } = req.headers;

  if (!authorization) return false;

  const receivedToken = authorization.split('Bearer ')[1];
  const authToken = process.env.TOKEN;

  return receivedToken === authToken;
}

function authentication(req, res, next) {
  if (req.url === '/auth') next();
  else if (isAuthenticated(req)) next();
  else res.sendStatus(401);
}

module.exports = authentication;
