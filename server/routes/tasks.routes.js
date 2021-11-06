const express = require('express');
const router = express.Router({ mergeParams: true });

const tasksController = require('../controllers/tasks.controller');

router.route('/api/tasks').get(tasksController.getTasksList);
router.route('/api/tasks/:id').get(tasksController.getTask);

router
	.route('/api/tasks/ratio_point_coordinates')
	.post(tasksController.ratioPointCoordinates);

router
	.route('/api/tasks/build_parallelogram')
	.post(tasksController.buildParallelogram);

router
	.route('/api/tasks/find_sides_length')
	.post(tasksController.findSidesLength);

router
	.route('/api/tasks/find_angle_between_diagonales')
	.post(tasksController.findAngleBetweenDiagonales);

router
	.route('/api/tasks/find_parallelogram_area')
	.post(tasksController.findParallelogramArea);

router
	.route('/api/tasks/build_parallelepiped')
	.post(tasksController.buildParallelepiped);

router
	.route('/api/tasks/find_parallelepiped_volume')
	.post(tasksController.findParallelepipedVolume);

router
	.route('/api/tasks/find_parallelepiped_height')
	.post(tasksController.findParallelepipedHeight);

// TODO
router
	.route('/api/tasks/find_vector_in_basis')
	.post(tasksController.findVectorInBasis);

router
	.route('/api/tasks/find_vector_projection')
	.post(tasksController.findVectorProjection);

router
	.route('/api/tasks/find_plane_equation_by_points')
	.post(tasksController.findPlaneEquation);

router
	.route('/api/tasks/find_plane_equation_by_point_and_line')
	.post(tasksController.findPlaneEquation);

router
	.route('/api/tasks/find_distance_between_lines')
	.post(tasksController.findDistanceBetweenLines);

router
	.route('/api/tasks/find_symmetrical_point')
	.post(tasksController.findSymmetricalPoint);

router
	.route('/api/tasks/find_angle_between_planes')
	.post(tasksController.findAngleBetweenPlanes);

module.exports = router;
