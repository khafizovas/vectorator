/**
 * Найти координаты точки М, делящей вектор AB в отношении a : b
 * @param {{first: Point3D, second: Point3D}} vectorPoints координаты концов вектора
 * @param {{a: number, b: number}} ratioParts заданное отношение
 * @returns {solution} координата искомой точки
 */
const findRatioPoint3D = (vectorPoints, ratioParts) => {
	const task = { vectorPoints: vectorPoints, ratioParts: ratioParts };
	const solution = [];

	solution.push({
		name: 'ratio',
		type: 'number',
		value: ratioParts.a / ratioParts.b,
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

	return { task: task, solution: solution, result: result };
};

/**
 * Поиск координаты, делящей в заданном отношении, по координатам начальной и конечной точки
 * @param {number} first
 * @param {number} second
 * @param {number} ratio
 * @returns {number}
 */
const findRatioCoordinate = (first, second, ratio) => {
	return (first + ratio * second) / (1 + ratio);
};

module.exports = findRatioPoint3D;
