const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; // Ensure you have a JWT secret in your environment variables

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log("🚀 ~ authenticateToken ~ token:", token)

  if (token == null) return res.sendStatus(401); // No token provided

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
   
    req.user = user; // Attach user data to the request object
    next();
  });
};

module.exports = authenticateToken;
