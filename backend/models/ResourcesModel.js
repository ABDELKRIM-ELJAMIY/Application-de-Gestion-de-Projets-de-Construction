const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    quantity: { type: Number, required: true },
    supplier: { type: String, required: true },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true }
});

const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;
