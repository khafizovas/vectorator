const { buildVector3D } = require('.');
const findMatrixDeterminant = require('./helpers/find_matrix_determinant');
const findPlaneMatrixes = require('./helpers/find_plane_matrixes');
const sumPointAndVector = require('./helpers/sum_point_and_vector');
const findGCD = require('./helpers/find_GCD');

/**
 * Найти уравнение плоскости
 * @param {{Point3D, Point3D, Point3D, Point3D}}
 * @returns {solution}
 */
const findPlaneEquation = ({ a, b, d, a1 }) => {
	points = [a];

	const task = { a, b };
	const solution = [];

	if (a1) {
		const aa1 = buildVector3D(a, a1);

		points.push(a1);
		points.push(sumPointAndVector(b, aa1));

		task.b = b;
		task.a1 = a1;

		solution.push({
			type: 'vector',
			name: 'AA_1',
			value: Object.values(aa1),
		});

		solution.push({
			type: 'point',
			name: 'B_1',
			value: Object.values(points[2]),
		});
	} else {
		task.b = b;
		task.d = d;

		points.push(b);
		points.push(d);
	}

	solution.push({
		type: 'matrixes',
		name: 'plane',
		value: findPlaneMatrixes(...points),
	});

	solution.push({
		type: 'numbers',
		name: 'determinants',
		value: solution[solution.length - 1].value.map((matrix) =>
			findMatrixDeterminant(matrix)
		),
	});

	const gcd = findGCD(...solution[solution.length - 1].value);

	solution.push({
		type: 'numbers',
		name: 'factors',
		value: solution[solution.length - 1].value.map((factor) => factor / gcd),
	});

	const result = {
		type: 'numbers',
		value: solution[solution.length - 1].value,
	};

	return { task, solution, result };
};

module.exports = findPlaneEquation;
