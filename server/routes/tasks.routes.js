const express = require('express');
const router = express.Router({ mergeParams: true });

const tasksController = require('../controllers/tasks.controller');

router.route('/api/tasks').get(tasksController.getTasksList);
router.route('/api/tasks/:id').get(tasksController.getTask);

router
	.route('/api/tasks/ratio_point_coordinates')
	.post(tasksController.ratioPointCoordinates);

module.exports = router;
