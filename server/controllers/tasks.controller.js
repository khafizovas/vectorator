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
					type: 'vector',
					name: 'AB',
					value: [Object.values(req.body.a), Object.values(req.body.b)],
				},
				{
					type: 'vector',
					name: 'AB',
					value: [Object.values(req.body.a), Object.values(req.body.d)],
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
	const task = [
		{
			type: 'vector',
			name: 'AB',
			value: [Object.values(req.body.a), Object.values(req.body.b)],
		},
		{
			type: 'vector',
			name: 'AD',
			value: [Object.values(req.body.a), Object.values(req.body.d)],
		},
	];

	if (!canBuildParallelogram(task, Object.values(req.body))) {
		return;
	}

	getSolution(vectors, res, {
		task: JSON.stringify({
			key: 2,
			task: task,
		}),
		maths: maths.findParallelorgamSides,
		descriptor: descriptors.describeParallelorgamSides,
	});
};

const findAngleBetweenDiagonales = (req, res) => {
	if (
		!canBuildParallelogram(
			[
				{
					type: 'vector',
					value: [Object.values(req.body.a), Object.values(req.body.b)],
				},
				{
					type: 'vector',
					value: [Object.values(req.body.a), Object.values(req.body.d)],
				},
			],
			Object.values(req.body)
		)
	) {
		return;
	}

	getSolution(Object.values(req.body), res, {
		task: JSON.stringify({
			key: 3,
			task: [
				{
					type: 'parallelogram',
					name: 'ABCD',
					value: [
						Object.values(req.body.a),
						Object.values(req.body.b),
						Object.values(
							maths.sumPointAndVector(
								req.body.b,
								maths.buildVector3D(req.body.a, req.body.d)
							)
						),
						Object.values(req.body.d),
					],
				},
			],
		}),
		maths: maths.findParallelogramDiagonalesAngles,
		descriptor: descriptors.describeParallelogramDiagonalesAngles,
	});
};

const findParallelogramArea = (req, res) => {
	if (
		!canBuildParallelogram(
			[
				{
					type: 'vector',
					value: [Object.values(req.body.a), Object.values(req.body.b)],
				},
				{
					type: 'vector',
					value: [Object.values(req.body.a), Object.values(req.body.d)],
				},
			],
			Object.values(req.body)
		)
	) {
		return;
	}

	const vectors = [
		maths.buildVector3D(req.body.a, req.body.b),
		maths.buildVector3D(req.body.a, req.body.d),
	];

	getSolution(vectors, res, {
		task: JSON.stringify({
			key: 4,
			task: [
				{
					type: 'parallelogram',
					name: 'ABCD',
					value: [
						Object.values(req.body.a),
						Object.values(req.body.b),
						Object.values(
							maths.sumPointAndVector(
								req.body.b,
								maths.buildVector3D(req.body.a, req.body.d)
							)
						),
						Object.values(req.body.d),
					],
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

	getSolution([...vectors, req.body], res, {
		task: JSON.stringify({
			key: 5,
			task: [
				{
					type: 'vector',
					name: 'AB',
					value: [Object.values(req.body.a), Object.values(req.body.b)],
				},
				{
					type: 'vector',
					name: 'AD',
					value: [Object.values(req.body.a), Object.values(req.body.d)],
				},
				{
					type: 'vector',
					name: 'AA_1',
					value: [Object.values(req.body.a), Object.values(req.body.a1)],
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

	if (
		!canBuildParallelepiped(
			[
				{
					type: 'vector',
					name: 'AB',
					value: [Object.values(req.body.a), Object.values(req.body.b)],
				},
				{
					type: 'vector',
					name: 'AD',
					value: [Object.values(req.body.a), Object.values(req.body.d)],
				},
				{
					type: 'vector',
					name: 'AA_1',
					value: [Object.values(req.body.a), Object.values(req.body.a1)],
				},
			],
			[...vectors, req.body]
		)
	) {
		return;
	}

	const c = maths.sumPointAndVector(
		req.body.b,
		maths.buildVector3D(req.body.a, req.body.d)
	);
	const aa1 = maths.buildVector3D(req.body.a, req.body.a1);

	getSolution([...vectors, req.body], res, {
		task: JSON.stringify({
			key: 6,
			task: [
				{
					type: 'parallelepiped',
					name: 'ABCDA_1B_1C_1D_1',
					value: [
						[
							Object.values(req.body.a),
							Object.values(req.body.b),
							Object.values(c),
							Object.values(req.body.d),
						],
						[
							Object.values(maths.sumPointAndVector(req.body.a, aa1)),
							Object.values(maths.sumPointAndVector(req.body.b, aa1)),
							Object.values(maths.sumPointAndVector(c, aa1)),
							Object.values(maths.sumPointAndVector(req.body.d, aa1)),
						],
					],
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

	if (
		!canBuildParallelepiped(
			[
				{
					type: 'vector',
					name: 'AB',
					value: [Object.values(req.body.a), Object.values(req.body.b)],
				},
				{
					type: 'vector',
					name: 'AD',
					value: [Object.values(req.body.a), Object.values(req.body.d)],
				},
				{
					type: 'vector',
					name: 'AA_1',
					value: [Object.values(req.body.a), Object.values(req.body.a1)],
				},
			],
			[...vectors, req.body]
		)
	) {
		return;
	}

	const c = maths.sumPointAndVector(
		req.body.b,
		maths.buildVector3D(req.body.a, req.body.d)
	);
	const aa1 = maths.buildVector3D(req.body.a, req.body.a1);

	getSolution([...vectors, req.body], res, {
		task: JSON.stringify({
			key: 7,
			task: [
				{
					type: 'parallelepiped',
					name: 'ABCDA_1B_1C_1D_1',
					value: [
						[
							Object.values(req.body.a),
							Object.values(req.body.b),
							Object.values(c),
							Object.values(req.body.d),
						],
						[
							Object.values(maths.sumPointAndVector(req.body.a, aa1)),
							Object.values(maths.sumPointAndVector(req.body.b, aa1)),
							Object.values(maths.sumPointAndVector(c, aa1)),
							Object.values(maths.sumPointAndVector(req.body.d, aa1)),
						],
					],
				},
			],
		}),
		maths: maths.findParallelepipedHeight,
		descriptor: descriptors.describeParallelepipedHeight,
	});
};

// TODO test and fix
const findVectorInBasis = (req, res) => {
	const vector = maths.buildVector3D(req.body.a, req.body.h);
	const basis = [
		maths.buildVector3D(req.body.a, req.body.b),
		maths.buildVector3D(req.body.a, req.body.d),
		maths.buildVector3D(req.body.a, req.body.a1),
	];

	getSolution([vector, basis], res, {
		task: JSON.stringify({
			key: 8,
			task: [
				{
					type: 'vector',
					name: 'AH',
					value: [Object.values(req.body.a), Object.values(req.body.h)],
				},
				{
					type: 'vector',
					name: 'AB',
					value: [Object.values(req.body.a), Object.values(req.body.b)],
				},
				{
					type: 'vector',
					name: 'AD',
					value: [Object.values(req.body.a), Object.values(req.body.d)],
				},
				{
					type: 'vector',
					name: 'AA_1',
					value: [Object.values(req.body.a), Object.values(req.body.a1)],
				},
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
				{
					type: 'vector',
					name: 'AH',
					value: [Object.values(req.body.a), Object.values(req.body.h)],
				},
				{
					type: 'vector',
					name: 'AA_1',
					value: [Object.values(req.body.a), Object.values(req.body.a1)],
				},
			],
		}),
		maths: maths.findVectorProjection,
		descriptor: descriptors.describeVectorProjection,
	});
};

const findPlaneEquation = (req, res) => {
	const key = req.body.a1 ? 11 : 10;
	const task = req.body.a1
		? [
				{ type: 'point', name: 'A', value: Object.values(req.body.a) },
				{ type: 'point', name: 'A_1', value: Object.values(req.body.a1) },
				{ type: 'point', name: 'B', value: Object.values(req.body.b) },
		  ]
		: [
				{ type: 'point', name: 'A', value: Object.values(req.body.a) },
				{ type: 'point', name: 'B', value: Object.values(req.body.b) },
				{ type: 'point', name: 'D', value: Object.values(req.body.d) },
		  ];

	getSolution([req.body], res, {
		task: JSON.stringify({
			key: key,
			task: task,
		}),
		maths: maths.findPlaneEquation,
		descriptor: descriptors.describePlaneEquation,
	});
};

// TODO C isn't in the task
const findDistanceBetweenLines = (req, res) => {
	getSolution(Object.values(req.body), res, {
		task: JSON.stringify({
			key: 12,
			task: [
				{ type: 'point', name: 'A', value: Object.values(req.body.a) },
				{ type: 'point', name: 'B', value: Object.values(req.body.b) },
				{ type: 'point', name: 'C', value: Object.values(req.body.c) },
				{ type: 'point', name: 'A_1', value: Object.values(req.body.a1) },
			],
		}),
		maths: maths.findDistanceBetweenLines,
		descriptor: descriptors.describeDistanceBetweenLines,
	});
};

const findSymmetricalPoint = (req, res) => {
	getSolution(Object.values(req.body), res, {
		task: JSON.stringify({
			key: 13,
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
			key: 14,
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

const canBuildParallelogram = (task, params) => {
	if (!maths.buildParallelogram(...params).result.value) {
		console.log('cannot build parallelogram');

		res.send({
			describedSolution: [
				{
					description: 'На данных векторах нельзя построить параллелограмм',
					action: '',
				},
			],
			result: { type: 'bool', value: false },
			solution: [],
			task: JSON.stringify({
				key: 1,
				task: task,
			}),
		});

		return false;
	}

	return true;
};

const canBuildParallelepiped = (task, params) => {
	if (!maths.buildParallelepiped(...params).result.value) {
		console.log('cannot build parallelepiped');

		res.send({
			describedSolution: [
				{
					description: 'На данных векторах нельзя построить параллелепипед',
					action: '',
				},
			],
			result: { type: 'bool', value: false },
			solution: [],
			task: JSON.stringify({
				key: 5,
				task: task,
			}),
		});

		return false;
	}

	return true;
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
