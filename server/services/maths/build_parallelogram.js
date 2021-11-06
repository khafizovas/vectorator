const buildVector3D = require('./build_vector_3d');

/**
 * Проверить, можно ли на векторах AB и AD построить параллелограмм.
 * @param {Point3D} a
 * @param {Point3D} b
 * @param {Point3D} d
 * @returns {solution}
 */
const buildParallelogram = (a, b, d) => {
	const vectors = [buildVector3D(a, b), buildVector3D(a, d)];

	const task = { a: a, b: b, d: d };
	const solution = [];

	solution.push({
		name: 'AB',
		type: 'coordinates',
		value: Object.values(vectors[0]),
	});

	solution.push({
		name: 'AD',
		type: 'coordinates',
		value: Object.values(vectors[1]),
	});

	solution.push({
		name: 'collinearity',
		type: 'bool',
		value: areCollinearVectors(vectors[0], vectors[1]),
	});

	if (!solution[2].value) {
		solution.push({
			name: 'C',
			type: 'point',
			value: sumPointAndVector(b, vectors[1]),
		});

		solution.push({
			name: 'ABCD',
			type: 'parallelogram',
			value: [
				Object.values(a),
				Object.values(b),
				solution[3].value,
				Object.values(d),
			],
		});
	}

	const result = {
		type: 'bool',
		value: !solution[2].value,
	};

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

module.exports = buildParallelogram;
