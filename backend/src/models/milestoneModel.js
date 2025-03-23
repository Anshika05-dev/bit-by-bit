const db = require('../config/database');

const createMilestone = (project_id, title, description, amount) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO milestones (project_id, title, description, amount) VALUES (?, ?, ?, ?)',
      [project_id, title, description, amount],
      (err, result) => (err ? reject(err) : resolve(result))
    );
  });
};

const getMilestonesByProject = (project_id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM milestones WHERE project_id = ?', [project_id], (err, results) =>
      err ? reject(err) : resolve(results)
    );
  });
};

const updateMilestone = (id, title, description, amount, status) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE milestones SET title=?, description=?, amount=?, status=? WHERE id=?',
      [title, description, amount, status, id],
      (err, result) => (err ? reject(err) : resolve(result))
    );
  });
};

const deleteMilestone = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM milestones WHERE id=?', [id], (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
};

// Get milestone details
const getMilestoneById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM milestones WHERE id = ?',
      [id],
      (err, results) => (err ? reject(err) : resolve(results[0]))
    );
  });
};

// Update milestone status (approve/reject)
const updateMilestoneStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE milestones SET status = ? WHERE id = ?',
      [status, id],
      (err, result) => (err ? reject(err) : resolve(result))
    );
  });
};

module.exports = { createMilestone, getMilestonesByProject, updateMilestone, deleteMilestone, getMilestoneById, updateMilestoneStatus };
