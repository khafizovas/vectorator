const findPlaneEquation = require('./find_plane_equation');
const buildVector3D = require('./build_vector_3d');
const { sumPointAndVector } = require('./helpers');

/**
 * Найти точку A_2, симметричную точке A_1 относительно плоскости основания ABCD.
 * @param {Point3D} a1
 * @param {Point3D} a
 * @param {Point3D} b
 * @param {Point3D} d
 * @returns {solution}
 */
const findSymmetricalPoint = (a1, a, b, d) => {
	const task = { a, b, d, a1 };
	const solution = [];

	solution.push({
		type: 'plane',
		name: 'ABCD',
		value: [
			Object.values(a),
			Object.values(b),
			Object.values(sumPointAndVector(b, buildVector3D(a, d))),
			Object.values(d),
		],
	});

	solution.push({
		type: 'numbers',
		name: 'plane',
		value: findPlaneEquation(a, b, d),
	});

	solution.push({
		type: 'vector',
		name: 'n',
		value: solution[solution.length - 1].value.slice(0, -1),
	});

	const t =
		-(
			Object.values(a1).reduce(
				(res, cur, i) => res + cur * solution[solution.length - 1].value[i],
				0
			) + solution[solution.length - 2].value[3]
		) /
		solution[solution.length - 1].value.reduce((res, cur) => res + cur ** 2, 0);

	solution.push({
		type: 'number',
		name: 't',
		value: t,
	});

	solution.push({
		type: 'coordinate',
		name: 'x',
		value: t * solution[2].value[0] + a1.x,
	});

	solution.push({
		type: 'coordinate',
		name: 'y',
		value: t * solution[2].value[1] + a1.y,
	});

	solution.push({
		type: 'coordinate',
		name: 'z',
		value: t * solution[2].value[2] + a1.z,
	});

	const a0 = {
		x: solution[solution.length - 3].value,
		y: solution[solution.length - 2].value,
		z: solution[solution.length - 1].value,
	};

	solution.push({
		type: 'point',
		name: 'A_0',
		value: Object.values(a0),
	});

	solution.push({
		type: 'vector',
		name: 'A_1A_0',
		value: [Object.values(a1), Object.values(a0)],
	});

	const a1a0 = buildVector3D(a1, a0);

	solution.push({
		type: 'number',
		name: 'A_1A_0',
		value: Object.values(a1a0),
	});

	solution.push({
		type: 'point',
		name: 'A_2',
		value: Object.values(sumPointAndVector(a0, a1a0)),
	});

	const result = {
		type: 'point',
		value: solution[solution.length - 1].value,
	};

	return { task, solution, result };
};

module.exports = findSymmetricalPoint;
