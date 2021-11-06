const buildVector3D = require('./helpers/build_vector_3d');
const findVectorsSum = require('./helpers/find_vectors_sum');
const findCosBetweenVectors = require('./helpers/find_cos_between_vectors');
const convertRadiansToDegrees = require('./helpers/convert_radians_to_degrees');

/**
 * Найти углы между диагоналями параллелограмма ABCD.
 * @param {Point3D} a
 * @param {Point3D} b
 * @param {Point3D} d
 * @returns {solution}
 */
const findParallelogramDiagonalesAngles = (a, b, d) => {
	const diagonales = [
		buildVector3D(b, d),
		findVectorsSum(buildVector3D(a, b), buildVector3D(a, d)),
	];

	const task = { a: a, b: b, d: d };
	const solution = [];

	solution.push({
		type: 'vector',
		name: 'BD',
		value: Object.values(diagonales[0]),
	});

	solution.push({
		type: 'vector',
		name: 'AC',
		value: Object.values(diagonales[1]),
	});

	solution.push({
		type: 'number',
		name: 'cos',
		value: findCosBetweenVectors(...diagonales),
	});

	solution.push({
		type: 'number',
		name: 'angle in radias',
		value: Math.acos(solution[2].value),
	});

	solution.push({
		type: 'number',
		name: 'angle in degrees',
		value: convertRadiansToDegrees(solution[3].value),
	});

	solution.push({
		type: 'number',
		name: 'another angle',
		value: 180 - solution[4].value,
	});

	const result = {
		type: 'numbers',
		value: [solution[4].value, solution[5].value],
	};

	return { task, solution, result };
};

module.exports = findParallelogramDiagonalesAngles;
