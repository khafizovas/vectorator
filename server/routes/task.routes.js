const express = require('express');
const router = express.Router({ mergeParams: true });

const taskController = require('../controllers/task.controller');

router
	.route('/api/task/ratio_point_coordinates')
	.post(taskController.ratioPointCoordinates);

module.exports = router;
