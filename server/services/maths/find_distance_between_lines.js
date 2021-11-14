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
 * @param {Point3D} d
 * @param {Point3D} a1
 * @returns {solution}
 */
const findDistanceBetweenLines = (a, b, d, a1) => {
	const ad = buildVector3D(a, d);
	const c = sumPointAndVector(b, ad);

	const task = { a, b, d, a1 };
	let solution = [];

	solution.push({
		type: 'vector',
		name: 'AD',
		value: [Object.values(a), Object.values(d)],
	});

	solution.push({
		type: 'coordinates',
		name: 'AD',
		value: Object.values(ad),
	});

	solution.push({
		type: 'point',
		name: 'C',
		value: Object.values(c),
	});

	solution.push({
		type: 'vector',
		name: 'CC_1',
		value: [
			Object.values(c),
			Object.values(sumPointAndVector(c, buildVector3D(a, a1))),
		],
	});

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

	solution = [...solution, ...findPlaneEquation({ a, b, d: a1 }).solution];

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
