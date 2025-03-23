const express = require('express');
const { authenticateUser } = require('../middleware/authMiddleware');
const {
  raiseDispute,
  getAllDisputes,
  resolveDispute
} = require('../controllers/disputeController');

const router = express.Router();

// Routes
router.post('/raise', authenticateUser, raiseDispute); // Raise a dispute
router.get('/all', authenticateUser, getAllDisputes); // View disputes
router.put('/resolve/:id', authenticateUser, resolveDispute); // Admin resolves a dispute

module.exports = router;
