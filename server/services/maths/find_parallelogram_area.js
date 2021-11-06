const findVectorLength = require('./find_vector_length');

/**
 * Найти площадь параллелограмма ABCD.
 * @param {Vector3D} lhs
 * @param {Vector3D} rhs
 * @returns {solution}
 */
function findParallelogramArea(lhs, rhs) {
	const vector = findVector3DProduct(lhs, rhs);

	const task = { lhs: lhs, rhs: rhs };
	const solution = [];

	solution.push({
		type: 'vector',
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

// FIXME Helpers

/**
 * Найти векторное произведение векторов.
 * @param {Vector3D} lhs
 * @param {Vector3D} rhs
 * @returns {Vector3D}
 */
function findVector3DProduct(lhs, rhs) {
	return {
		x: lhs.y * rhs.z - rhs.y * lhs.z,
		y: lhs.x * rhs.z - rhs.x * lhs.z,
		z: lhs.x * rhs.y - rhs.x * lhs.y,
	};
}

module.exports = findParallelogramArea;
