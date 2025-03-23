const express = require('express');
const { authenticateUser } = require('../middleware/authMiddleware');
const {
  createMilestone,
  getMilestones,
  updateMilestone,
  deleteMilestone,
  approveMilestone,
  rejectMilestone
} = require('../controllers/milestoneController');

const router = express.Router();

router.post('/', authenticateUser, createMilestone); // Create Milestone
router.get('/:project_id', authenticateUser, getMilestones); // Get All Milestones for a Project
router.put('/:id', authenticateUser, updateMilestone); // Update Milestone
router.delete('/:id', authenticateUser, deleteMilestone); // Delete Milestone
router.put('/approve/:id', authenticateUser, approveMilestone); // Approve Milestone
router.put('/reject/:id', authenticateUser, rejectMilestone); // Reject Milestone

module.exports = router;
