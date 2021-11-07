const buildVector3D = require('./build_vector_3d');
const findPlaneEquation = require('./find_plane_equation');
const {
	sumPointAndVector,
	findDistanceBetweenPointAndPlane,
} = require('./helpers');

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
