const buildVector3D = require('./build_vector_3d');
const {
	findVectorsSum,
	sumPointAndVector,
	findAngleBetweenVectors,
} = require('./helpers');

/**
 * Найти углы между диагоналями параллелограмма ABCD.
 * @param {Point3D} a
 * @param {Point3D} b
 * @param {Point3D} d
 * @returns {solution}
 */
const findParallelogramDiagonalesAngles = (a, b, d) => {
	const ad = buildVector3D(a, d);
	const ab = buildVector3D(a, b);
	const diagonales = [buildVector3D(b, d), findVectorsSum(ab, ad)];

	const task = { a: a, b: b, d: d };
	let solution = [];

	solution.push({
		type: 'vector',
		name: ['B', 'D'],
		value: [Object.values(b), Object.values(d)],
	});

	solution.push({
		type: 'coordinates',
		name: 'BD',
		value: Object.values(diagonales[0]),
	});

	solution.push({
		type: 'coordinates',
		name: 'AB',
		value: Object.values(ab),
	});

	solution.push({
		type: 'coordinates',
		name: 'AD',
		value: Object.values(ad),
	});

	solution.push({
		type: 'vector',
		name: ['A', 'C'],
		value: [Object.values(a), Object.values(sumPointAndVector(b, ad))],
	});

	solution.push({
		type: 'coordinates',
		name: 'AC',
		value: Object.values(diagonales[1]),
	});

	solution = [...solution, ...findAngleBetweenVectors(...diagonales).solution];

	solution.push({
		type: 'number',
		name: 'another angle',
		value: 180 - solution[solution.length - 1].value,
	});

	const result = {
		type: 'numbers',
		value: [
			solution[solution.length - 2].value,
			solution[solution.length - 1].value,
		],
	};

	return { task, solution, result };
};

module.exports = findParallelogramDiagonalesAngles;
