const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    type: { type: String, required: true }, 
    quantite: { type: Number, required: true },
    taskID: { type: mongoose.Schema.Types.ObjectId, ref: 'Tasks', required: true }
});

const Resources = mongoose.model('Resources', resourceSchema);

module.exports = Resources;
