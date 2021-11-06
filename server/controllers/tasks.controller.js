const { Task, Solution } = require('../database/models/index');

const maths = require('../services/maths/index');
const descriptors = require('../services/descriptors/index');

// Tasks
const getTasksList = (req, res) => {
	Task.find({}, { _id: 0 }, (err, result) => {
		res.send({
			tasks: result,
		});
	});
};

const getTask = (req, res) => {
	Task.findOne({ key: req.params.id }, { _id: 0 }, (err, result) => {
		res.send({
			task: result,
		});
	});
};

// Solutions
const ratioPointCoordinates = (req, res) => {
	getSolution(Object.values(req.body), res, {
		task: JSON.stringify({
			key: 0,
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
		}),
		maths: maths.findRatioPoint3D,
		descriptor: descriptors.describeRatioPoint3D,
	});
};

const buildParallelogram = (req, res) => {
	getSolution(
		[
			maths.buildVector3D(req.body.a, req.body.b),
			maths.buildVector3D(req.body.a, req.body.d),
			{
				a: req.body.a,
				b: req.body.b,
				d: req.body.d,
			},
		],
		res,
		{
			task: JSON.stringify({
				key: 1,
				task: [
					{
						type: 'point',
						name: 'A',
						value: Object.values(req.body.a),
					},
					{
						type: 'point',
						name: 'B',
						value: Object.values(req.body.b),
					},
					{
						type: 'point',
						name: 'D',
						value: Object.values(req.body.d),
					},
				],
			}),
			maths: maths.canBuildParallelogram,
			descriptor: descriptors.describeParallelogram,
		}
	);
};

// TODO add params and task
const findSidesLength = (req, res) => {
	getSolution(null, res, {
		task: JSON.stringify({ key: 2, task: '' }),
		maths: maths.findParallelorgamSides,
		descriptor: descriptors.describeParallelorgamSides,
	});
};

const findAngleBetweenDiagonales = (req, res) => {
	getSolution(Object.values(req.body), res, {
		task: JSON.stringify({
			key: 3,
			task: [
				{
					type: 'point',
					name: 'A',
					value: Object.values(req.body.a),
				},
				{
					type: 'point',
					name: 'B',
					value: Object.values(req.body.b),
				},
				{
					type: 'point',
					name: 'D',
					value: Object.values(req.body.d),
				},
			],
		}),
		maths: maths.findParallelogramDiagonalesAngles,
		descriptor: descriptors.describeParallelogramDiagonalesAngles,
	});
};

// TODO add params and task
const findParallelogramArea = (req, res) => {
	getSolution(null, res, {
		task: JSON.stringify({ key: 2, task: '' }),
		maths: maths.findParallelogramArea,
		descriptor: descriptors.describeParallelogramArea,
	});
};

const buildParallelepiped = (req, res) => {
	getSolution(null, res, {
		task: JSON.stringify({ key: 2, task: '' }),
		maths: maths.canBuildParallelepiped,
		descriptor: descriptors.describeParallelepiped,
	});
};

const findParallelepipedVolume = (req, res) => {
	getSolution(null, res, {
		task: JSON.stringify({ key: 2, task: '' }),
		maths: maths.findParallelepipedVolume,
		descriptor: descriptors.describeParallelepipedVolume,
	});
};

const findParallelepipedHeight = (req, res) => {
	getSolution(null, res, {
		task: JSON.stringify({ key: 2, task: '' }),
		maths: maths.findParallelepipedHeight,
		descriptor: descriptors.describeParallelepipedHeight,
	});
};

const findVectorInBasis = (req, res) => {
	getSolution(null, res, {
		task: JSON.stringify({ key: 2, task: '' }),
		maths: maths.findVectorDecomposition,
		descriptor: descriptors.describeVectorDecomposition,
	});
};

const findVectorProjection = (req, res) => {
	getSolution(null, res, {
		task: JSON.stringify({ key: 2, task: '' }),
		maths: maths.findVectorProjection,
		descriptor: descriptors.describeVectorProjection,
	});
};

const findPlaneEquation = (req, res) => {
	getSolution(null, res, {
		task: JSON.stringify({ key: 2, task: '' }),
		maths: maths.findPlaneEquation,
		descriptor: descriptors.describePlaneEquation,
	});
};

const findDistanceBetweenLines = (req, res) => {
	getSolution(null, res, {
		task: JSON.stringify({ key: 2, task: '' }),
		maths: maths.findDistanceBetweenLines,
		descriptor: descriptors.describeDistanceBetweenLines,
	});
};

const findSymmetricalPoint = (req, res) => {
	getSolution(null, res, {
		task: JSON.stringify({ key: 2, task: '' }),
		maths: maths.findSymmetricalPoint,
		descriptor: descriptors.describeSymmetricalPoint,
	});
};

const findAngleBetweenPlanes = (req, res) => {
	getSolution(null, res, {
		task: JSON.stringify({ key: 2, task: '' }),
		maths: maths.findAngleBetweenPlanes,
		descriptor: descriptors.describeAngleBetweenPlanes,
	});
};

// Helpers

const getSolution = (params, res, taskInfo) => {
	Solution.findOne({ task: taskInfo.task }, { _id: 0 }, (err, result) => {
		if (result) {
			res.send(result);
		} else {
			createNewSolution(params, res, taskInfo);
		}
	});
};

const createNewSolution = (params, res, taskInfo) => {
	const solution = taskInfo.maths(...params);
	console.log(solution);
	const describedSolution = taskInfo.descriptor(solution);

	const newSolution = new Solution({
		...describedSolution,
		result: solution.result,
		solution: solution.solution,
		task: taskInfo.task,
	});

	newSolution.save().then((data) => {
		res.send(data);
	});
};

module.exports = {
	getTasksList,
	getTask,
	ratioPointCoordinates,
	buildParallelogram,
	findSidesLength,
	findAngleBetweenDiagonales,
	findParallelogramArea,
	buildParallelepiped,
	findParallelepipedVolume,
	findParallelepipedHeight,
	findVectorInBasis,
	findVectorProjection,
	findPlaneEquation,
	findDistanceBetweenLines,
	findSymmetricalPoint,
	findAngleBetweenPlanes,
};
