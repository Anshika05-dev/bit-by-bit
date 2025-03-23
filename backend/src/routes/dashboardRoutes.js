const express = require('express');
const { authenticateUser } = require('../middleware/authMiddleware');
const {
  getFreelancerDashboard,
  getEmployerDashboard,
  getAdminDashboard
} = require('../controllers/dashboardController');

const router = express.Router();

// Routes
router.get('/freelancer', authenticateUser, getFreelancerDashboard);
router.get('/employer', authenticateUser, getEmployerDashboard);
router.get('/admin', authenticateUser, getAdminDashboard);

module.exports = router;
