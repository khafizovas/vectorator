const buildVector3D = require('./build_vector_3d');

/**
 * Найти углы между диагоналями параллелограмма ABCD.
 * @param {Point3D} a
 * @param {Point3D} b
 * @param {Point3D} d
 * @returns {solution}
 */
const findParallelogramDiagonalesAngles = (a, b, d) => {
	const diagonales = [
		buildVector3D(b, d),
		sumVectors(buildVector3D(a, b), buildVector3D(a, d)),
	];

	const task = { a: a, b: b, d: d };
	const solution = [];

	solution.push({
		type: 'vector',
		name: 'BD',
		value: Object.values(diagonales[0]),
	});

	solution.push({
		type: 'vector',
		name: 'AC',
		value: Object.values(diagonales[1]),
	});

	solution.push({
		type: 'number',
		name: 'cos',
		value: findCosBetweenVectors(...diagonales),
	});

	solution.push({
		type: 'number',
		name: 'angle in radias',
		value: Math.acos(solution[2].value),
	});

	solution.push({
		type: 'number',
		name: 'angle in degrees',
		value: convertRadiansToDegrees(solution[3].value),
	});

	solution.push({
		type: 'number',
		name: 'another angle',
		value: 180 - solution[4].value,
	});

	const result = {
		type: 'numbers',
		value: [solution[4].value, solution[5].value],
	};

	return { task, solution, result };
};

// FIXME Helpers

/**
 * Найти сумму векторов.
 * @param {Vector3D} lhs
 * @param {Vector3D} rhs
 * @returns {number[]}
 */
function sumVectors(lhs, rhs) {
	return {
		x: lhs.x + rhs.x,
		y: lhs.y + rhs.y,
		z: lhs.z + rhs.z,
	};
}

/**
 * Найти косинус угла между векторами.
 * @param {Vector3D} lhs
 * @param {Vector3D} rhs
 * @returns {number}
 */
function findCosBetweenVectors(lhs, rhs) {
	return (
		findScalarVectorProduct(lhs, rhs) /
		(findVectorLength(lhs) * findVectorLength(rhs))
	);
}

/**
 * Найти скалярное произведение векторов.
 * @param {Vector3D} lhs
 * @param {Vector3D} rhs
 * @returns {number}
 */
function findScalarVectorProduct(lhs, rhs) {
	return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z;
}

/**
 * Перевести радианы в градусы.
 * @param {number} radians
 * @returns {number}
 */
function convertRadiansToDegrees(radians) {
	return (radians * 180) / Math.PI;
}

module.exports = findParallelogramDiagonalesAngles;
