const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: { type: String, required: true },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects', required: true }
    
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
