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
	Task.findOne({ key: req.params.key }, { _id: 0 }, (err, result) => {
		res.send({
			task: result,
		});
	});
};

// TODO Fix before getSolution

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
	getSolution(Object.values(req.body), res, {
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
		maths: maths.buildParallelogram,
		descriptor: descriptors.describeParallelogram,
	});
};

const findSidesLength = (req, res) => {
	const vectors = [
		maths.buildVector3D(req.body.a, req.body.b),
		maths.buildVector3D(req.body.a, req.body.d),
	];

	getSolution(vectors, res, {
		task: JSON.stringify({
			key: 2,
			task: [
				{
					type: 'vector',
					name: 'AB',
					value: Object.values(vectors[0]),
				},
				{
					type: 'vector',
					name: 'AD',
					value: Object.values(vectors[1]),
				},
			],
		}),
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

const findParallelogramArea = (req, res) => {
	const vectors = [
		maths.buildVector3D(req.body.a, req.body.b),
		maths.buildVector3D(req.body.a, req.body.d),
	];

	getSolution(vectors, res, {
		task: JSON.stringify({
			key: 4,
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
		maths: maths.findParallelogramArea,
		descriptor: descriptors.describeParallelogramArea,
	});
};

const buildParallelepiped = (req, res) => {
	const vectors = [
		maths.buildVector3D(req.body.a, req.body.b),
		maths.buildVector3D(req.body.a, req.body.d),
		maths.buildVector3D(req.body.a, req.body.a1),
	];

	getSolution(vectors, res, {
		task: JSON.stringify({
			key: 5,
			task: [
				{
					type: 'vector',
					name: 'AB',
					value: Object.values(vectors[0]),
				},
				{
					type: 'vector',
					name: 'AD',
					value: Object.values(vectors[1]),
				},
				{
					type: 'vector',
					name: 'AA_1',
					value: Object.values(vectors[2]),
				},
			],
		}),
		maths: maths.buildParallelepiped,
		descriptor: descriptors.describeParallelepiped,
	});
};

const findParallelepipedVolume = (req, res) => {
	const vectors = [
		maths.buildVector3D(req.body.a, req.body.b),
		maths.buildVector3D(req.body.a, req.body.d),
		maths.buildVector3D(req.body.a, req.body.a1),
	];

	getSolution(vectors, res, {
		task: JSON.stringify({
			key: 6,
			task: [
				{
					type: 'vector',
					name: 'AB',
					value: Object.values(vectors[0]),
				},
				{
					type: 'vector',
					name: 'AD',
					value: Object.values(vectors[1]),
				},
				{
					type: 'vector',
					name: 'AA_1',
					value: Object.values(vectors[2]),
				},
			],
		}),
		maths: maths.findParallelepipedVolume,
		descriptor: descriptors.describeParallelepipedVolume,
	});
};

const findParallelepipedHeight = (req, res) => {
	const vectors = [
		maths.buildVector3D(req.body.a, req.body.b),
		maths.buildVector3D(req.body.a, req.body.d),
		maths.buildVector3D(req.body.a, req.body.a1),
	];

	getSolution(vectors, res, {
		task: JSON.stringify({
			key: 7,
			task: [
				{
					type: 'vector',
					name: 'AB',
					value: Object.values(vectors[0]),
				},
				{
					type: 'vector',
					name: 'AD',
					value: Object.values(vectors[1]),
				},
				{
					type: 'vector',
					name: 'AA_1',
					value: Object.values(vectors[2]),
				},
			],
		}),
		maths: maths.findParallelepipedHeight,
		descriptor: descriptors.describeParallelepipedHeight,
	});
};

const findVectorInBasis = (req, res) => {
	const vector = maths.buildVector3D(req.body.a, req.body.h);
	const basis = [
		maths.buildVector3D(req.body.a, req.body.b),
		maths.buildVector3D(req.body.a, req.body.d),
		maths.buildVector3D(req.body.a, req.body.a1),
	];

	getSolution({ vector, basis }, res, {
		task: JSON.stringify({
			key: 8,
			task: [
				{ type: 'vector', name: 'AH', value: Object.values(vector) },
				{ type: 'vector', name: 'AB', value: Object.values(basis[0]) },
				{ type: 'vector', name: 'AD', value: Object.values(basis[1]) },
				{ type: 'vector', name: 'AA_1', value: Object.values(basis[2]) },
			],
		}),
		maths: maths.findVectorDecomposition,
		descriptor: descriptors.describeVectorDecomposition,
	});
};

const findVectorProjection = (req, res) => {
	const vectors = [
		maths.buildVector3D(req.body.a, req.body.h),
		maths.buildVector3D(req.body.a, req.body.a1),
	];

	getSolution(vectors, res, {
		task: JSON.stringify({
			key: 9,
			task: [
				{ type: 'vector', name: 'AH', value: Object.values(vectors[0]) },
				{ type: 'vector', name: 'AA_1', value: Object.values(vectors[1]) },
			],
		}),
		maths: maths.findVectorProjection,
		descriptor: descriptors.describeVectorProjection,
	});
};

const findPlaneEquation = (req, res) => {
	getSolution(Object.values(req.body), res, {
		task: JSON.stringify({
			key: 10,
			task: [
				{ type: 'point', name: 'A', value: Object.values(req.body.a) },
				{ type: 'point', name: 'B', value: Object.values(req.body.b) },
				{ type: 'point', name: 'D', value: Object.values(req.body.d) },
			],
		}),
		maths: maths.findPlaneEquation,
		descriptor: descriptors.describePlaneEquation,
	});
};

const findDistanceBetweenLines = (req, res) => {
	getSolution(Object.values(req.body), res, {
		task: JSON.stringify({
			key: 11,
			task: [
				{ type: 'point', name: 'A', value: Object.values(req.body.a) },
				{ type: 'point', name: 'B', value: Object.values(req.body.b) },
				{ type: 'point', name: 'C', value: Object.values(req.body.c) },
				{
					type: 'vector',
					name: 'AA_1',
					value: maths.buildVector3D(req.body.a, req.body.a1),
				},
			],
		}),
		maths: maths.findDistanceBetweenLines,
		descriptor: descriptors.describeDistanceBetweenLines,
	});
};

const findSymmetricalPoint = (req, res) => {
	getSolution(Object.values(req.body), res, {
		task: JSON.stringify({
			key: 12,
			task: [
				{ type: 'point', name: 'A_1', value: Object.values(req.body.a1) },
				{ type: 'point', name: 'A', value: Object.values(req.body.a) },
				{ type: 'point', name: 'B', value: Object.values(req.body.b) },
				{ type: 'point', name: 'D', value: Object.values(req.body.d) },
			],
		}),
		maths: maths.findSymmetricalPoint,
		descriptor: descriptors.describeSymmetricalPoint,
	});
};

const findAngleBetweenPlanes = (req, res) => {
	getSolution(Object.values(req.body), res, {
		task: JSON.stringify({
			key: 13,
			task: [
				{ type: 'point', name: 'A', value: Object.values(req.body.a) },
				{ type: 'point', name: 'B', value: Object.values(req.body.b) },
				{ type: 'point', name: 'D', value: Object.values(req.body.d) },
				{ type: 'point', name: 'A_1', value: Object.values(req.body.a1) },
			],
		}),
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
