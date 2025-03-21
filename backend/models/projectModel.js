const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    nom: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateDebut: {
        type: Date,
        required: true
    },
    dateFin: {
        type: Date,
        required: true
    },
    budget: {
        type: Number, required: true}
});

const Projects = mongoose.model('Projects', projectSchema);

module.exports = Projects;
