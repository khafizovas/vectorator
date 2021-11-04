const tasks = require('../tasks');

const findRatioPoint3D = require('../services/maths/ratio_point_coordinates');
const describeRatioPoint3D = require('../services/descriptors/ratio_point_coordinates');

const getTasksList = (req, res) => {
	res.send({ tasks: tasks });
};

const getTask = (req, res) => {
	res.send({ task: tasks[req.params.id] });
};

const ratioPointCoordinates = (req, res) => {
	const solution = findRatioPoint3D(req.body.vectorPoints, req.body.ratioParts);
	const describedSolution = describeRatioPoint3D(
		solution.task,
		solution.solution
	);

	res.send({
		task: [
			{
				type: 'vector',
				name: 'AB',
				value: Object.values(req.body.vectorPoints).map((point) =>
					Object.values(point)
				),
			},
			{ type: 'number', name: 'a', value: req.body.ratioParts.a },
			{ type: 'number', name: 'b', value: req.body.ratioParts.b },
		],
		...describedSolution,
		solution: solution.solution,
		result: solution.result,
	});
};

module.exports = { getTasksList, getTask, ratioPointCoordinates };
