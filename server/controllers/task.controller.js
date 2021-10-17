const findRatioPoint3D = require('../services/maths/ratio_point_coordinates');
const describeRatioPoint3D = require('../services/descriptors/ratio_point_coordinates');

const ratioPointCoordinates = (req, res) => {
	const solution = findRatioPoint3D(req.body.vectorPoints, req.body.ratioParts);
	const describedSolution = describeRatioPoint3D(
		solution.task,
		solution.solution
	);

	res.send(
		JSON.stringify({
			...describedSolution,
			solution: solution.solution,
			result: solution.result,
		})
	);
};

module.exports = { ratioPointCoordinates };
