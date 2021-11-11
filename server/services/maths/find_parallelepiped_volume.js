const buildParallelepiped = require('./build_parallelepiped');

/**
 * Найти объём параллелепипеда, построенного на векторах AB, AD, AA1.
 * @param {Vector3D} AB
 * @param {Vector3D} AD
 * @param {Vector3D} AA1
 * @returns {solution}
 */
const findParallelepipedVolume = (AB, AD, AA1, coordinates) => {
	const task = { AB, AD, AA1 };
	const solution = buildParallelepiped(AB, AD, AA1, coordinates).solution;

	result = { type: 'number', value: solution[1].value };

	return { task, solution, result };
};

module.exports = findParallelepipedVolume;
