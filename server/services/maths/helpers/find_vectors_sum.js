/**
 * Найти сумму векторов.
 * @param {Vector3D} lhs
 * @param {Vector3D} rhs
 * @returns {Vector3D}
 */
const findVectorsSum = (lhs, rhs) => {
	return {
		x: lhs.x + rhs.x,
		y: lhs.y + rhs.y,
		z: lhs.z + rhs.z,
	};
};

module.exports = findVectorsSum;
