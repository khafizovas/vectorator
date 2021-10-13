const tasks = [
	{
		id: 1,
		name: 'Координаты точки, делящей вектор в отношении',
		task: 'Найти координаты точки М, делящей вектор AB в отношении a : b',
		reqBodySample: {
			pointsPair: {
				first: { x: '', y: '', z: '' },
				second: { x: 'x', y: 'y', z: 'z' },
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
			{ type: 'number', caption: 'a' },
			{ type: 'number', caption: 'b' },
		],
		path: '/ratio_point_coordinates',
	},
];

module.exports = tasks;
