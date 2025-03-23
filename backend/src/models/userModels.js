// const db = require('../config/database');
// const bcrypt = require('bcryptjs');

// // Create User
// const createUser = async (name, email, password, role = 'freelancer') => {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   return new Promise((resolve, reject) => {
//     db.query(
//       'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
//       [name, email, hashedPassword, role],
//       (err, result) => {
//         if (err) reject(err);
//         resolve(result);
//       }
//     );
//   });
// };

// // Find User by Email
// const findUserByEmail = (email) => {
//   return new Promise((resolve, reject) => {
//     db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
//       if (err) reject(err);
//       console.log(results)
//       resolve(results[0]);
//     });
//   });
// };

// module.exports = { createUser, findUserByEmail };
const db = require('../config/database');
const bcrypt = require('bcryptjs');

const createUser = async (name, email, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role],
      (err, result) => (err ? reject(err) : resolve(result))
    );
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      err ? reject(err) : resolve(results[0]);
    });
  });
};

module.exports = { createUser, findUserByEmail };
