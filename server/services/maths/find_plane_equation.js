const buildVector3D = require('./build_vector_3d');
const {
	findMatrixDeterminant,
	findPlaneMatrixes,
	sumPointAndVector,
	findGCD,
} = require('./helpers');

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
			type: 'coordinates',
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

	solution.push({
		type: 'numbers',
		name: 'members',
		value: [
			solution[solution.length - 1].value[0],
			-solution[solution.length - 1].value[0],
			solution[solution.length - 1].value[0],
			-findD(...solution[solution.length - 1].value, a),
		],
	});

	const gcd = findGCD(...solution[solution.length - 1].value);

	solution.push({
		type: 'numbers',
		name: 'members',
		value: solution[solution.length - 1].value.map((member) => member / gcd),
	});

	const result = {
		type: 'numbers',
		value: solution[solution.length - 1].value,
	};

	return { task, solution, result };
};

const findD = (a, b, c, point) => {
	return a * point.x - b * point.y + c * point.z;
};

module.exports = findPlaneEquation;
