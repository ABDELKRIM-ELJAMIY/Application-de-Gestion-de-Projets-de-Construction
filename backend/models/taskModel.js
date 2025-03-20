const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: { type: String, required: true },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    projectID: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects', required: true }
});

const Tasks = mongoose.model('Tasks', taskSchema); 

module.exports = Tasks;
