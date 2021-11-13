const { findScalarProduct, findVectorLength } = require('./helpers');

/**
 * Найти проекцию вектора AH на вектор AA_1
 * @param {Vector3D} lhs
 * @param {Vector3D} rhs
 * @returns {solution}
 */
const findVectorProjection = (lhs, rhs) => {
	const task = { lhs, rhs };
	const solution = [];

	solution.push({
		type: 'number',
		name: 'AH * AA_1',
		value: findScalarProduct(lhs, rhs),
	});

	solution.push({
		type: 'number',
		name: '|AA_1|',
		value: findVectorLength(rhs),
	});

	solution.push({
		type: 'number',
		name: 'projection',
		value: solution[0].value / solution[1].value,
	});

	const result = { type: 'number', value: solution[solution.length - 1].value };

	return { task, solution, result };
};

module.exports = findVectorProjection;
