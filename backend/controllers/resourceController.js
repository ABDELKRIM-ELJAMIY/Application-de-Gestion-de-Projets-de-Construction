const Resource = require('../models/ResourcesModel');
const Task = require('../models/taskModel');


exports.getAllResources = async (req, res) => {
    try {
        const resources = await Resource.find().populate('taskId');
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: "Error fetching resources", error });
    }
};
exports.getResourcesByTaskId = async (req, res) => {
    try {
        const { taskId } = req.params; 

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Tâche non trouvée" });
        }

        const resources = await Resource.find({ taskId });
        if (resources.length === 0) {
            return res.status(404).json({ message: "Aucune ressource trouvée pour cette tâche" });
        }
        
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des ressources", error });
    }
};
exports.getResourcesByTaskId = async (req, res) => {
    try {
        const { taskId } = req.params;
        const resources = await Resource.find({ taskId }).populate('taskId');
        if (!resources.length) {
            return res.status(404).json({ message: "No resources found for this task." });
        }
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: "Error fetching resources", error });
    }
};


exports.createResource = async (req, res) => {
    try {
        const { taskId } = req.params; 
        const { name, type, quantity, supplier } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Tâche non trouvée" });
        }

       
        const newResource = new Resource({ name, type, quantity, supplier, taskId });
        await newResource.save();

        res.status(201).json(newResource);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la ressource", error });
    }
};




exports.deleteResource = async (req, res) => {
    try {
        const { taskId, resourceId } = req.params; 

        
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Tâche non trouvée" });
        }

        
        const resource = await Resource.findOne({ _id: resourceId, taskId });
        if (!resource) {
            return res.status(404).json({ message: "Ressource non trouvée pour cette tâche" });
        }

       
        await Resource.findByIdAndDelete(resourceId);

        res.status(200).json({ message: "Ressource supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la ressource", error });
    }
};


exports.updateResource = async (req, res) => {
    try {
        const { taskId, resourceId } = req.params; 

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Tâche non trouvée" });
        }

        const resource = await Resource.findOne({ _id: resourceId, taskId });
        if (!resource) {
            return res.status(404).json({ message: "Ressource non trouvée pour cette tâche" });
        }

        const { name, type, quantity, supplier } = req.body;
        resource.name = name || resource.name;
        resource.type = type || resource.type;
        resource.quantity = quantity || resource.quantity;
        resource.supplier = supplier || resource.supplier;

        await resource.save();

        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la ressource", error });
    }
};