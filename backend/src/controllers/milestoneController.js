const {
    createMilestone,
    getMilestonesByProject,
    updateMilestone,
    deleteMilestone,
    getMilestoneById,
    updateMilestoneStatus
  } = require('../models/milestoneModel');
  
  // Create a Milestone
  exports.createMilestone = async (req, res) => {
    const { project_id, title, description, amount } = req.body;
  
    try {
      await createMilestone(project_id, title, description, amount);
      res.status(201).json({ message: 'Milestone created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get Milestones for a Project
  exports.getMilestones = async (req, res) => {
    const { project_id } = req.params;
  
    try {
      const milestones = await getMilestonesByProject(project_id);
      res.status(200).json(milestones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update Milestone
  exports.updateMilestone = async (req, res) => {
    const { title, description, amount, status } = req.body;
    const { id } = req.params;
  
    try {
      await updateMilestone(id, title, description, amount, status);
      res.status(200).json({ message: 'Milestone updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete Milestone
  exports.deleteMilestone = async (req, res) => {
    const { id } = req.params;
  
    try {
      await deleteMilestone(id);
      res.status(200).json({ message: 'Milestone deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Approve milestone
exports.approveMilestone = async (req, res) => {
    const { id } = req.params;
  console.log(id)
    if (req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Only employers can approve milestones.' });
    }
  
    try {
      const milestone = await getMilestoneById(id);
  
      if (!milestone) {
        return res.status(404).json({ message: 'Milestone not found.' });
      }
  
      await updateMilestoneStatus(id, 'completed');
      res.status(200).json({ message: 'Milestone approved successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Reject milestone
  exports.rejectMilestone = async (req, res) => {
    const { id } = req.params;
  
    if (req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Only employers can reject milestones.' });
    }
  
    try {
      const milestone = await getMilestoneById(id);
  
      if (!milestone) {
        return res.status(404).json({ message: 'Milestone not found.' });
      }
  
      await updateMilestoneStatus(id, 'rejected');
      res.status(200).json({ message: 'Milestone rejected successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };