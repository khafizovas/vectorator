const { findRatioCoordinate } = require('./helpers');

/**
 * Найти координаты точки М, делящей вектор AB в отношении a : b.
 * @param {{first: Point3D, second: Point3D}} vectorPoints координаты концов вектора
 * @param {{a: number, b: number}} ratioParts заданное отношение
 * @returns {solution} координата искомой точки
 */
const findRatioPoint3D = (vectorPoints, ratioParts) => {
	const task = { vectorPoints, ratioParts };
	const solution = [];

	solution.push({
		name: 'ratio',
		type: 'number',
		value: Number((ratioParts.a / ratioParts.b).toPrecision(4)),
	});

	solution.push({
		name: 'x',
		type: 'coordinate',
		value: findRatioCoordinate(
			vectorPoints.first.x,
			vectorPoints.second.x,
			solution[0].value
		),
	});

	solution.push({
		name: 'y',
		type: 'coordinate',
		value: findRatioCoordinate(
			vectorPoints.first.y,
			vectorPoints.second.y,
			solution[0].value
		),
	});

	solution.push({
		name: 'z',
		type: 'coordinate',
		value: findRatioCoordinate(
			vectorPoints.first.z,
			vectorPoints.second.z,
			solution[0].value
		),
	});

	solution.push({
		name: 'M',
		type: 'point',
		value: [solution[1].value, solution[2].value, solution[3].value],
	});

	const result = {
		type: 'point',
		value: {
			x: solution[4].value[0],
			y: solution[4].value[1],
			z: solution[4].value[2],
		},
	};

	return { task, solution, result };
};

module.exports = findRatioPoint3D;
