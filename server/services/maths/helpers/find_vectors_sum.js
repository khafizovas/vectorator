/**
 * Найти сумму векторов.
 * @param {Vector3D} lhs
 * @param {Vector3D} rhs
 * @returns {Vector3D}
 */
const findVectorsSum = (lhs, rhs) => {
	return {
		x: Number((lhs.x + rhs.x).toPrecision(4)),
		y: Number((lhs.y + rhs.y).toPrecision(4)),
		z: Number((lhs.z + rhs.z).toPrecision(4)),
	};
};

module.exports = findVectorsSum;
