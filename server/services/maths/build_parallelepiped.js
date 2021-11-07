const { convertVectorsToMatrix, findMatrixDeterminant } = require('./helpers');

/**
 * Убедиться, что на векторах AB, AD, AA1 можно построить параллелепипед.
 * @param {Vector3D} AB
 * @param {Vector3D} AD
 * @param {Vector3D} AA1
 * @returns {solution}
 */
const buildParallelepiped = (AB, AD, AA1) => {
	const task = { AB: AB, AD: AD, AA1: AA1 };
	const solution = [];

	solution.push({
		type: 'matrix',
		name: 'matrix',
		value: convertVectorsToMatrix([AB, AD, AA1]),
	});

	solution.push({
		type: 'number',
		name: 'V',
		value: findMatrixDeterminant(solution[0].value),
	});

	result = { type: 'bool', value: solution[1].value !== 0 };

	return { task, solution, result };
};

module.exports = buildParallelepiped;
