const { buildVector3D, findPlaneEquation } = require('.');
const sumPointAndVector = require('./helpers/sum_point_and_vector');
const findDistanceBetweenPointAndPlane = require('./helpers/find_distance_between_point_and_plane');

/**
 * Найти расстояние между прямыми, на которых лежат ребра AB и CC_1.
 * @param {Point3D} a
 * @param {Point3D} b
 * @param {Point3D} c
 * @param {Point3D} a1
 * @returns {solution}
 */
const findDistanceBetweenLines = (a, b, c, a1) => {
	const task = { a, b, c, a1 };
	const solution = [];

	solution.push({
		type: 'plane',
		name: 'AA_1B_1B',
		value: [
			Object.values(a),
			Object.values(a1),
			Object.values(sumPointAndVector(b, buildVector3D(a, a1))),
			Object.values(b),
		],
	});

	solution.push({
		type: 'numbers',
		name: 'A_1AB',
		value: findPlaneEquation(a, b, a1),
	});

	solution.push({
		type: 'number',
		name: 'distance',
		value: findDistanceBetweenPointAndPlane(
			c,
			solution[solution.length - 1].value
		),
	});

	const result = {
		type: 'number',
		value: solution[solution.length - 1].value,
	};

	return { task, solution, result };
};

module.exports = findDistanceBetweenLines;
