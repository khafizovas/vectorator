/**
 * Найти точку A_2, симметричную точке A_1 относительно плоскости основания ABCD.
 * @param {Point3D} a1
 * @param {Point3D} a
 * @param {Point3D} b
 * @param {Point3D} d
 * @returns {solution}
 */
const findSymmetricalPoint = (a1, a, b, d) => {
	const task = { a, b, d, a1 };
	const solution = [];

	const result = {
		type: 'point',
		value: '',
	};

	return { task, solution, result };
};

module.exports = findSymmetricalPoint;
