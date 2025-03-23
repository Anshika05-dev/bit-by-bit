const express = require('express');
const { authenticateUser } = require('../middleware/authMiddleware');
const {
  submitWork,
  getWorkByMilestone,
  updateWorkStatus,
} = require('../controllers/workController');

const router = express.Router();

router.post('/', authenticateUser, submitWork); // Freelancers submit work
router.get('/:milestone_id', authenticateUser, getWorkByMilestone); // Employers view work
router.put('/:id', authenticateUser, updateWorkStatus); // Employers approve/reject work

module.exports = router;
