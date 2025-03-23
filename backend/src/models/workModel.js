const db = require('../config/database');

// Submit Work
const submitWork = (milestone_id, freelancer_id, submission_link, notes) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO work_submissions (milestone_id, freelancer_id, submission_link, notes) VALUES (?, ?, ?, ?)',
      [milestone_id, freelancer_id, submission_link, notes],
      (err, result) => (err ? reject(err) : resolve(result))
    );
  });
};

// Get Submissions by Milestone
const getWorkByMilestone = (milestone_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM work_submissions WHERE milestone_id = ?',
      [milestone_id],
      (err, results) => (err ? reject(err) : resolve(results))
    );
  });
};

// Update Work Status (Approve/Reject)
const updateWorkStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE work_submissions SET status = ? WHERE id = ?',
      [status, id],
      (err, result) => (err ? reject(err) : resolve(result))
    );
  });
};

module.exports = { submitWork, getWorkByMilestone, updateWorkStatus };
