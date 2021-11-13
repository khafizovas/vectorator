const findMatrixDeterminant = require('./find_matrix_determinant');
const replaceMatrixColumn = require('./replace_matrix_column');

/**
 * Решить систему уравнений методом Крамера.
 * @param {number[][]} matrix
 * @param {number[]} vectorCoordinates
 * @returns {solution}
 */
const solveSystemCramer = (matrix, vectorCoordinates) => {
	const task = { matrix, vectorCoordinates };
	const solution = [];

	solution.push({
		type: 'number',
		name: 'det',
		value: findMatrixDeterminant(matrix),
	});

	solution.push({
		type: 'matrixes',
		name: 'matrixes',
		value: [
			replaceMatrixColumn(matrix, vectorCoordinates, 0),
			replaceMatrixColumn(matrix, vectorCoordinates, 1),
			replaceMatrixColumn(matrix, vectorCoordinates, 2),
		],
	});

	solution.push({
		type: 'number',
		name: 'det1',
		value: findMatrixDeterminant(solution[1].value[0]) / solution[0].value,
	});

	solution.push({
		type: 'number',
		name: 'det2',
		value: findMatrixDeterminant(solution[1].value[1]) / solution[0].value,
	});

	solution.push({
		type: 'number',
		name: 'det3',
		value: findMatrixDeterminant(solution[1].value[2]) / solution[0].value,
	});

	const result = {
		type: 'numbers',
		value: [solution[2].value, solution[3].value, solution[4].value],
	};

	return { task, solution, result };
};

module.exports = solveSystemCramer;
