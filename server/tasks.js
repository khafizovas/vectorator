const tasks = [
	{
		name: 'Координаты точки, делящей вектор в отношении',
		task: 'Найти координаты точки М, делящей вектор AB в отношении a : b',
		reqBodySample: {
			vectorPoints: {
				first: { x: '', y: '', z: '' },
				second: { x: '', y: '', z: '' },
			},
			ratioParts: { a: '', b: '' },
		},
		inputs: [
			{ type: 'number', caption: 'x точки A', decimal: true },
			{ type: 'number', caption: 'y точки A', decimal: true },
			{ type: 'number', caption: 'z точки A', decimal: true },
			{ type: 'number', caption: 'x точки B', decimal: true },
			{ type: 'number', caption: 'y точки B', decimal: true },
			{ type: 'number', caption: 'z точки B', decimal: true },
			{ type: 'number', caption: 'a', min: 0 },
			{ type: 'number', caption: 'b', min: 0 },
		],
		path: '/ratio_point_coordinates',
	},
];

module.exports = tasks;