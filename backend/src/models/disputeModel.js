const db = require('../config/database');

// Create a dispute
const createDispute = (milestone_id, user_id, reason) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO disputes (milestone_id, user_id, reason) VALUES (?, ?, ?)',
      [milestone_id, user_id, reason],
      (err, result) => (err ? reject(err) : resolve(result))
    );
  });
};

// Get disputes for admin or user
const getDisputes = (user_id, role) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM disputes`;
    if (role !== 'admin') {
      query += ` WHERE user_id = ?`;
    }
    db.query(query, role !== 'admin' ? [user_id] : [], (err, results) =>
      err ? reject(err) : resolve(results)
    );
  });
};

// Update dispute status
const updateDisputeStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE disputes SET status = ? WHERE id = ?',
      [status, id],
      (err, result) => (err ? reject(err) : resolve(result))
    );
  });
};

module.exports = {
  createDispute,
  getDisputes,
  updateDisputeStatus,
};
