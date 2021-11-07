/**
 * Найти сумму точки и вектора.
 * @param {Point3D} point
 * @param {Vector3D} vector
 * @returns {Point3D}
 */
const sumPointAndVector = (point, vector) => {
	return {
		x: point.x + vector.x,
		y: point.y + vector.y,
		z: point.z + vector.z,
	};
};

module.exports = sumPointAndVector;
