const describeParallelepiped = require('./build_parallelepiped');

const describeParallelepipedVolume = ({ task, solution, result }) => {
	return describeParallelepiped({ task, solution, result });
};

module.exports = describeParallelepipedVolume;
