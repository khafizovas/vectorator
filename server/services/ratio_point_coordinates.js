/**
 * Найти координаты точки М, делящей вектор AB в отношении a : b
 * @param {{first: Point3D, second: Point3D}} pointsPair координаты концов вектора
 * @param {{a: number, b: number}} ratioParts заданное отношение
 * @returns {Point3D} координата искомой точки
 */
const findRatioPoint3D = (pointsPair, ratioParts) => {
	const ratio = ratioParts.a / ratioParts.b;

	const result = {
		x: findRatioCoordinate(pointsPair.first.x, pointsPair.second.x, ratio),
		y: findRatioCoordinate(pointsPair.first.y, pointsPair.second.y, ratio),
		z: findRatioCoordinate(pointsPair.first.z, pointsPair.second.z, ratio),
	};

	const solution = [
		{
			caption: 'Найдём a / b',
			name: 'lambda',
			equals: `a / b = ${ratioParts.a} / ${ratioParts.b} = ${ratio}`,
		},
		{
			caption: 'Найдём координату x искомой точки M',
			name: 'M_x',
			equals: `(A_x + lambda * B_x) / (1 + lambda) = (${pointsPair.first.x} + ${ratio} * ${pointsPair.second.x}) / (1 + ${ratio}) = ${result.x}`,
		},
		{
			caption: 'Найдём координату y искомой точки M',
			name: 'M_y',
			equals: `(A_y + lambda * B_y) / (1 + lambda) = (${pointsPair.first.y} + ${ratio} * ${pointsPair.second.y}) / (1 + ${ratio}) = ${result.y}`,
		},
		{
			caption: 'Найдём координату z искомой точки M',
			name: 'M_z',
			equals: `(A_z + lambda * B_z) / (1 + lambda) = (${pointsPair.first.z} + ${ratio} * ${pointsPair.second.z}) / (1 + ${ratio}) = ${result.z}`,
		},
	];

	return { solution, result };
};

/**
 * @param {number} first
 * @param {number} second
 * @param {number} ratio
 * @returns {number}
 */
const findRatioCoordinate = (first, second, ratio) => {
	return (first + ratio * second) / (1 + ratio);
};

module.exports = findRatioPoint3D;
