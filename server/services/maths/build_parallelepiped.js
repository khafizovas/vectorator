const buildVector3D = require('./build_vector_3d');
const {
	convertVectorsToMatrix,
	findMatrixDeterminant,
	sumPointAndVector,
} = require('./helpers');

/**
 * Убедиться, что на векторах AB, AD, AA1 можно построить параллелепипед.
 * @param {Vector3D} AB
 * @param {Vector3D} AD
 * @param {Vector3D} AA1
 * @returns {solution}
 */
const buildParallelepiped = (AB, AD, AA1, coordinates) => {
	const task = { AB, AD, AA1 };
	const solution = [];

	solution.push({
		type: 'numbers',
		name: 'vectors',
		value: convertVectorsToMatrix([AB, AD, AA1]),
	});

	solution.push({
		type: 'number',
		name: 'V',
		value: findMatrixDeterminant(solution[0].value),
	});

	const c = sumPointAndVector(
		coordinates.b,
		buildVector3D(coordinates.a, coordinates.d)
	);
	const aa1 = buildVector3D(coordinates.a, coordinates.a1);

	solution.push({
		type: 'parallelepiped',
		name: ['A', 'B', 'C', 'D', 'A_1', 'B_1', 'C_1', 'D_1'],
		value: [
			[
				Object.values(coordinates.a),
				Object.values(coordinates.b),
				Object.values(c),
				Object.values(coordinates.d),
			],
			[
				Object.values(sumPointAndVector(coordinates.a, aa1)),
				Object.values(sumPointAndVector(coordinates.b, aa1)),
				Object.values(sumPointAndVector(c, aa1)),
				Object.values(sumPointAndVector(coordinates.d, aa1)),
			],
		],
	});

	result = { type: 'bool', value: solution[1].value !== 0 };

	return { task, solution, result };
};

module.exports = buildParallelepiped;
