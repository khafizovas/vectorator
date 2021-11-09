const describeParallelepipedVolume = require('./find_parallelepiped_volume');
const describeParallelogramArea = require('./find_parallelogram_area');

const describeParallelepipedHeight = ({ task, solution, result }) => {
	const describedSolution = describeParallelepipedVolume({
		task,
		solution,
		result,
	}).concat(
		describeParallelogramArea({ task, solution: solution.slice(2), result })
	);

	describedSolution.push({
		description: 'Найдём искомую высоту',
		action: `h = V / S = ${solution[1].value} / ${solution[3].value} = ${solution[4].value}`,
	});

	return describedSolution;
};

module.exports = describeParallelepipedHeight;
