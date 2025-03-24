const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

router.get('/', resourceController.getAllResources);
router.get('/task/:taskId', resourceController.getResourcesByTaskId);
router.post('/:taskId', resourceController.createResource);
router.put('/:taskId/:resourceId', resourceController.updateResource);
router.delete('/:taskId/:resourceId', resourceController.deleteResource);
module.exports = router;
