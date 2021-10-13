/**
 * Найти координаты точки М, делящей вектор AB в отношении a : b
 * @param {{first: Point3D, second: Point3D}} pointsPair координаты концов вектора
 * @param {{a: number, b: number}} ratioParts заданное отношение
 * @returns {Point3D} координата искомой точки
 */
const findRatioPoint3D = (pointsPair, ratioParts) => {
	const ratio = ratioParts.a / ratioParts.b;

	return {
		x: findRatioCoordinate(pointsPair.first.x, pointsPair.second.x, ratio),
		y: findRatioCoordinate(pointsPair.first.y, pointsPair.second.y, ratio),
		z: findRatioCoordinate(pointsPair.first.z, pointsPair.second.z, ratio),
	};
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
