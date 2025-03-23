const db = require('../config/database');

const createProject = (employer_id, title, description) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO projects (employer_id, title, description) VALUES (?, ?, ?)',
      [employer_id, title, description],
      (err, result) => (err ? reject(err) : resolve(result))
    );
  });
};

const getProjectsByEmployer = (employer_id) => {
  return new Promise((resolve, reject) => {
    console.log(employer_id)
    db.query('SELECT * FROM projects WHERE employer_id = ?', [employer_id], (err, results) =>
      // console.log(results)
      err ? reject(err) : resolve(results)
    );
  });
};

const updateProject = (id, title, description, status) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE projects SET title=?, description=?, status=? WHERE id=?',
      [title, description, status, id],
      (err, result) => (err ? reject(err) : resolve(result))
    );
  });
};

const deleteProject = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM projects WHERE id=?', [id], (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
};

module.exports = { createProject, getProjectsByEmployer, updateProject, deleteProject };
