const { submitWork, getWorkByMilestone, updateWorkStatus } = require('../models/workModel');

// Submit Work
exports.submitWork = async (req, res) => {
  const { milestone_id, submission_link, notes } = req.body;
  const freelancer_id = req.user.id; // Authenticated freelancer

  if (req.user.role !== 'freelancer') {
    return res.status(403).json({ message: 'Only freelancers can submit work' });
  }

  try {
    await submitWork(milestone_id, freelancer_id, submission_link, notes);
    res.status(201).json({ message: 'Work submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Work by Milestone
exports.getWorkByMilestone = async (req, res) => {
  const { milestone_id } = req.params;

  if (req.user.role !== 'employer') {
    return res.status(403).json({ message: 'Only employers can view submissions' });
  }

  try {
    const submissions = await getWorkByMilestone(milestone_id);
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Approve or Reject Work
exports.updateWorkStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (req.user.role !== 'employer') {
    return res.status(403).json({ message: 'Only employers can approve or reject work' });
  }

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    await updateWorkStatus(id, status);
    res.status(200).json({ message: `Work ${status} successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
