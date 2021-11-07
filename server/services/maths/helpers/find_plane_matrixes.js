/**
 * Составить матрицы для уравнения плоскости по 3 точкам
 * @param {Point3D} a
 * @param {Point3D} b
 * @param {Point3D} c
 */
const findPlaneMatrixes = (a, b, c) => {
	const AXIS = ['x', 'y', 'z'];
	const matrix = Object.values(a).map((coordinate, i) => [
		b[AXIS[i] - coordinate],
		c[AXIS[i] - coordinate],
	]);

	return [
		[matrix[1], matrix[2]],
		[matrix[0], matrix[2]],
		[matrix[0], matrix[1]],
	];
};

module.exports = findPlaneMatrixes;
