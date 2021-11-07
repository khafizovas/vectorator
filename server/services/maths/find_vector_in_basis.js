const { buildVector3D } = require('.');
const { convertVectorsToMatrix, solveSystemCramer } = require('./helpers');

/**
 * Найти разложение вектора AH по векторам AB, AD, AA1.
 * @param {Vector3D} vector
 * @param {Vector3D} basis
 * @returns {Vector3D}
 */
const findVectorDecomposition = (vector, basis) => {
	const task = { vector, basis };
	let solution = [];

	solution.push({
		type: 'matrix',
		name: 'matrix',
		value: convertVectorsToMatrix(basis, true),
	});

	const cramerSolution = solveSystemCramer(
		solution[0].value,
		Object.values(buildVector3D(vector))
	);

	solution = [...solution, cramerSolution.solution];

	const result = cramerSolution.result;

	return { task, solution, result };
};

module.exports = findVectorDecomposition;
