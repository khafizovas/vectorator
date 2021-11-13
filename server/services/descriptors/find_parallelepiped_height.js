const describeParallelepipedVolume = require('./find_parallelepiped_volume');
const describeParallelogramArea = require('./find_parallelogram_area');

const describeParallelepipedHeight = ({ task, solution, result }) => {
	const describedSolution = [
		...describeParallelepipedVolume({
			task,
			solution,
			result,
		}).describedSolution,
		...describeParallelogramArea({
			task: { lhs: task.AB, rhs: task.AD },
			solution: solution.slice(-3, -1),
			result,
		}).describedSolution,
	];

	describedSolution.push({
		description: 'Найдём искомую высоту',
		action: `h = V / S = ${solution[1].value} / ${
			solution[solution.length - 2].value
		} = ${solution[solution.length - 1].value}`,
	});

	return { describedSolution };
};

module.exports = describeParallelepipedHeight;
