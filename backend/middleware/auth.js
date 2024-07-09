const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    // Redirect to login page if token is missing
    return res.redirect('/');
  }

  jwt.verify(token, 'kaskavele', (err, user) => {
    if (err) {
      // Redirect to login page if token verification fails
      return res.redirect('/');
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
