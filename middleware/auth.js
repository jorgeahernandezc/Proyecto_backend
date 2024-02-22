const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; 

const auth= (req, res, next) => {
  const token = req.header('Authorization');
  console.log(token)
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.body.userId = decoded.userId;
    console.log(decoded.userId)
    next();
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = auth;