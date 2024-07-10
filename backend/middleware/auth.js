const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/');
  }

  jwt.verify(token, kaskavele, (err, user) => {
    if (err) {
      return res.redirect('/');
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
