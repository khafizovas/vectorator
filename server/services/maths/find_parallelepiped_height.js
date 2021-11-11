const findParallelepipedVolume = require('./find_parallelepiped_volume');
const findParallelogramArea = require('./find_parallelogram_area');

/**
 * Найти высоту параллелепипеда, построенного на векторах AB, AD, AA1.
 * @param {Vector3D} AB
 * @param {Vector3D} AD
 * @param {Vector3D} AA1
 * @returns {solution}
 */
const findParallelepipedHeight = (AB, AD, AA1, coordinates) => {
	const task = { AB, AD, AA1 };
	let solution = findParallelepipedVolume(AB, AD, AA1, coordinates).solution;

	solution = [...solution, findParallelogramArea(AB, AD).solution];

	solution.push({
		type: 'number',
		name: 'h',
		value: solution[1].value / solution[solution.length - 1].value,
	});

	result = { type: 'number', value: solution[solution.length - 1].value };

	return { task, solution, result };
};

module.exports = findParallelepipedHeight;
