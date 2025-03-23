const express = require('express');
const { authenticateUser } = require('../middleware/authMiddleware');
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

const router = express.Router();

router.post('/', authenticateUser, createProject);
router.get('/', authenticateUser, getProjects);
router.put('/:id', authenticateUser, updateProject);
router.delete('/:id', authenticateUser, deleteProject);

module.exports = router;
