/**
 * Найти расстояние между точкой и плоскостью.
 * @param {Point3D} point
 * @param {number[]} planeEquation
 */
const findDistanceBetweenPointAndPlane = (point, planeEquation) => {
	return (
		Math.abs(
			Object.values(point).reduce(
				(res, cur, i) => res + cur * planeEquation[i],
				0
			) + planeEquation[3]
		) /
		Math.sqrt(
			planeEquation.slice(0, -1).reduce((res, cur) => res + cur ** 2, 0)
		)
	);
};

module.exports = findDistanceBetweenPointAndPlane;
