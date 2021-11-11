const { findVectorLength } = require('./helpers');

/**
 * Найти длины сторон паралелограмма, построенного на векторах AB и AD.
 * @param {Vector3D} lhs
 * @param {Vector3D} rhs
 * @returns {solution}
 */
const findParallelogramSides = (lhs, rhs) => {
	const task = { lhs, rhs };
	const solution = [];

	solution.push({
		name: '|AB|',
		type: 'number',
		value: findVectorLength(lhs),
	});

	solution.push({
		name: '|AD|',
		type: 'number',
		value: findVectorLength(rhs),
	});

	result = {
		type: 'numbers',
		value: [solution[0].value, solution[1].value],
	};

	return { task, solution, result };
};

module.exports = findParallelogramSides;
