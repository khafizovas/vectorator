const findCosBetweenVectors = require('./find_cos_between_vectors');
const convertRadiansToDegrees = require('./convert_radians_to_degrees');

const findAngleBetweenVectors = (lhs, rhs) => {
	const task = { lhs, rhs };
	const solution = [];

	solution.push({
		type: 'number',
		name: 'cos',
		value: findCosBetweenVectors(lhs, rhs),
	});

	solution.push({
		type: 'number',
		name: 'angle in radias',
		value: Math.acos(solution[solution.length - 1].value),
	});

	solution.push({
		type: 'number',
		name: 'angle in degrees',
		value: convertRadiansToDegrees(solution[solution.length - 1].value),
	});

	const result = {
		type: 'number',
		value: solution[solution.length - 1].value,
	};

	return { task, solution, result };
};

module.exports = findAngleBetweenVectors;
