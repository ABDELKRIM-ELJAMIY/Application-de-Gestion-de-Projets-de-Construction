const Project = require('../models/projectModel');

const createProject = async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Projet non trouvé' });
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).json({ message: 'Projet non trouvé' });
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: 'Projet non trouvé' });
        res.status(200).json({ message: 'Projet supprimé' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createProject, getAllProjects, getProjectById, updateProject, deleteProject };
