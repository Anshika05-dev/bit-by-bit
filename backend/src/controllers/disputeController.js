const { createDispute, getDisputes, updateDisputeStatus } = require('../models/disputeModel');

// Raise a dispute (Freelancer/Employer)
exports.raiseDispute = async (req, res) => {
  const { milestone_id, reason } = req.body;

  try {
    await createDispute(milestone_id, req.user.id, reason);
    res.status(201).json({ message: 'Dispute raised successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get disputes (Admin can view all, Users see their own disputes)
exports.getAllDisputes = async (req, res) => {
  try {
    const disputes = await getDisputes(req.user.id, req.user.role);
    res.status(200).json({ disputes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Resolve or Reject Dispute (Admin only)
exports.resolveDispute = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can resolve disputes.' });
  }

  if (!['resolved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status.' });
  }

  try {
    await updateDisputeStatus(id, status);
    res.status(200).json({ message: `Dispute marked as ${status}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
