const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasksController');

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.post('/project/:projectId', taskController.createTask);
router.get('/project/:projectId', taskController.getTasksByProject);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
