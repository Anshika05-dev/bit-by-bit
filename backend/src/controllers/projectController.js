const { createProject, getProjectsByEmployer, updateProject, deleteProject } = require('../models/projectModel');

exports.createProject = async (req, res) => {
  const { title, description } = req.body;
  const employer_id = req.user.id;

  try {
    await createProject(employer_id, title, description);
    res.status(201).json({ message: 'Project created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  const employer_id = req.user.id;
  try {
    const projects = await getProjectsByEmployer(employer_id);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  const { title, description, status } = req.body;
  const { id } = req.params;

  try {
    await updateProject(id, title, description, status);
    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteProject(id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
