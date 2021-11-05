/**
 * Проверить, можно ли на векторах AB и AD построить параллелограмм. Если да, то найти длины сторон параллелограмма.
 * @param {Vector3D} lhs
 * @param {Vector3D} rhs
 * @param {{a: Point3D, b: Point3D, d: Point3D}} coordinates
 * @returns {solution}
 */
const buildParallelogramOrNull = (lhs, rhs, coordinates) => {
	const task = { lhs: lhs, rhs: rhs, coordinates: coordinates };
	const solution = [];
	let result = null;

	solution.push({
		name: 'collinearity',
		type: 'bool',
		value: areCollinearVectors(lhs, rhs),
	});

	if (solution[0].value) {
		result = null;
	} else {
		solution.push({
			name: 'C',
			type: 'point',
			value: sumPointAndVector(coordinates.b, rhs),
		});
		solution.push({
			name: 'ABCD',
			type: 'parallelogram',
			value: [
				Object.values(coordinates.a),
				Object.values(coordinates.b),
				solution[1].value,
				Object.values(coordinates.d),
			],
		});
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
		result = { '|AB|': solution[3].value, '|AD|': solution[4].value };
	}

	return { task: task, solution: solution, result: result };
};

/**
 * Проверка коллинеарности векторов
 * @param {Vector3D} lhs
 * @param {Vector3D} rhs
 * @returns {Boolean}
 */
const areCollinearVectors = (lhs, rhs) => {
	return (
		lhs.x / rhs.x === lhs.y / rhs.y &&
		lhs.y / rhs.y === lhs.z / rhs.z &&
		lhs.x / rhs.x === lhs.z / rhs.z
	);
};

/**
 * Поиск суммы точки и вектора
 * @param {Point3D} point
 * @param {Vector3D} vector
 * @returns {Number[]}
 */
const sumPointAndVector = (point, vector) => {
	return [point.x + vector.x, point.y + vector.y, point.z + vector.z];
};

/**
 * Поиск длины вектора
 * @param {Vector3D} vector
 * @returns {number}
 */
const findVectorLength = (vector) => {
	return Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);
};

module.exports = buildParallelogramOrNull;
