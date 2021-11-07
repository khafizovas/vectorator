const buildVector3D = require('./build_vector_3d');
const findPlaneEquation = require('./find_plane_equation');
const { findAngleBetweenVectors, sumPointAndVector } = require('./helpers');

/**
 * Найти острый угол между плоскостями ABCD (плоскость P) и ABB1A1 (плоскость P1).
 * @param {Point3D} a
 * @param {Point3D} b
 * @param {Point3D} d
 * @param {Point3D} a1
 * @returns {solution}
 */
const findAngleBetweenPlanes = (a, b, d, a1) => {
	const aa1 = buildVector3D(a, a1);
	const ad = buildVector3D(a, d);
	const b1 = sumPointAndVector(b, aa1);
	const d1 = sumPointAndVector(d, aa1);
	const c = sumPointAndVector(b, ad);

	const task = { a, b, d, a1 };
	let solution = [];

	solution.push({
		type: 'plane',
		name: 'AA_1B_1B',
		value: [
			Object.values(a),
			Object.values(a1),
			Object.values(b1),
			Object.values(b),
		],
	});

	solution.push({
		type: 'plane',
		name: 'DD_1C_1C',
		value: [
			Object.values(d),
			Object.values(d1),
			Object.values(sumPointAndVector(b1, ad)),
			Object.values(c),
		],
	});

	solution.push({
		type: 'numbers',
		name: 'A_1AB',
		value: findPlaneEquation(a, b, a1),
	});

	solution.push({
		type: 'numbers',
		name: 'DD_1C',
		value: findPlaneEquation(d, d1, c),
	});

	solution = [
		...solution,
		findAngleBetweenVectors(
			solution[solution.length - 2].value.slice(0, -1),
			solution[solution.length - 1].value.slice(0, -1)
		).solution,
	];

	const result = {
		type: 'number',
		value: solution[solution.length - 1],
	};

	return { task, solution, result };
};

module.exports = findAngleBetweenPlanes;
