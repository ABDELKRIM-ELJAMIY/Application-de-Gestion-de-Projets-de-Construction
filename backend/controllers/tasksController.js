const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
    try {
        console.log("Received body:", req.body);
        const { projectId } = req.params; 
        const taskData = {
            ...req.body,
            projectId 
        };

        const task = await Task.create(taskData);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('projectId');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('projectId');
        if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getTasksByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const tasks = await Task.find({ projectId }).populate('projectId');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
        res.status(200).json({ message: "Tâche supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
