const { buildVector3D } = require('.');
const { areCollinearVectors, sumPointAndVector } = require('./helpers');

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
			value: Object.values(sumPointAndVector(b, vectors[1])),
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

module.exports = buildParallelogram;
