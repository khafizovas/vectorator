/**
 * Найти длины сторон паралелограмма, построенного на векторах AB и AD.
 * @param {Vector3D} lhs
 * @param {Vector3D} rhs
 * @returns {solution}
 */
const findParallelogramSides = (lhs, rhs) => {
	const task = { lhs: lhs, rhs: rhs };
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

	result = { '|AB|': solution[0].value, '|AD|': solution[1].value };

	return { task: task, solution: solution, result: result };
};

// FIXME Helpers

/**
 * Найти длину вектора.
 * @param {Vector3D} vector
 * @returns {number}
 */
const findVectorLength = (vector) => {
	return Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);
};

module.exports = findParallelogramSides;
