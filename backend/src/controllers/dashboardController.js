const db = require('../config/database');

// Dashboard for Freelancers
exports.getFreelancerDashboard = async (req, res) => {
  const freelancerId = req.user.id;

  try {
    const [submittedWork] = await db.promise().query(
      `SELECT m.id, m.title, m.status, m.amount, p.title AS project_title 
      FROM milestones m
      JOIN projects p ON p.id = m.project_id
      WHERE p.employer_id = ?`,
      [freelancerId]
    );

    res.json({ submittedWork });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dashboard for Employers
exports.getEmployerDashboard = async (req, res) => {
  const employerId = req.user.id;

  try {
    const [projects] = await db.promise().query(
      `SELECT p.id, p.title, COUNT(m.id) AS total_milestones,
      SUM(CASE WHEN m.status = 'pending' THEN 1 ELSE 0 END) AS pending_milestones
      FROM projects p
      LEFT JOIN milestones m ON p.id = m.project_id
      WHERE p.employer_id = ?
      GROUP BY p.id`,
      [employerId]
    );

    res.json({ projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dashboard for Admins
exports.getAdminDashboard = async (req, res) => {
  try {
    const [totalUsers] = await db.promise().query(`SELECT COUNT(*) AS total_users FROM users`);
    const [totalProjects] = await db.promise().query(`SELECT COUNT(*) AS total_projects FROM projects`);
    const [openDisputes] = await db.promise().query(`SELECT COUNT(*) AS open_disputes FROM disputes WHERE status = 'open'`);

    res.json({
      totalUsers: totalUsers[0].total_users,
      totalProjects: totalProjects[0].total_projects,
      openDisputes: openDisputes[0].open_disputes
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
