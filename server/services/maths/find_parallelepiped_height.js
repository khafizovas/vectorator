const { findParallelepipedVolume, findParallelogramArea } = require('.');

/**
 * Найти высоту параллелепипеда, построенного на векторах AB, AD, AA1.
 * @param {Vector3D} AB
 * @param {Vector3D} AD
 * @param {Vector3D} AA1
 * @returns {solution}
 */
const findParallelepipedHeight = (AB, AD, AA1) => {
	const task = { AB: AB, AD: AD, AA1: AA1 };
	let solution = findParallelepipedVolume(AB, AD, AA1).solution;

	solution = [...solution, findParallelogramArea(AB, AD).solution];

	solution.push({
		type: 'number',
		name: 'H',
		value: solution[1].value / solution[3].value,
	});

	result = { type: 'number', value: solution[4].value };

	return { task, solution, result };
};

module.exports = findParallelepipedHeight;
