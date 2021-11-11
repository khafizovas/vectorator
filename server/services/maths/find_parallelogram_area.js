const { findVectorLength, findVector3DProduct } = require('./helpers');

/**
 * Найти площадь параллелограмма ABCD.
 * @param {Vector3D} lhs
 * @param {Vector3D} rhs
 * @returns {solution}
 */
function findParallelogramArea(lhs, rhs) {
	const vector = findVector3DProduct(lhs, rhs);

	const task = { lhs, rhs };
	const solution = [];

	solution.push({
		type: 'coordinates',
		name: '[AB, AD]',
		value: Object.values(vector),
	});

	solution.push({
		type: 'number',
		name: 'area',
		value: findVectorLength(vector),
	});

	const result = { type: 'number', value: solution[1].value };

	return { task, solution, result };
}

module.exports = findParallelogramArea;
