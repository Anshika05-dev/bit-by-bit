// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();

// const authenticateToken = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Access denied' });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(403).json({ message: 'Invalid token' });
//   }
// };

// module.exports = { authenticateToken };
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token)
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticateUser };
