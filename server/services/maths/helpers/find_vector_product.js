/**
 * Найти векторное произведение векторов.
 * @param {Vector3D} lhs
 * @param {Vector3D} rhs
 * @returns {Vector3D}
 */
const findVector3DProduct = (lhs, rhs) => {
	return {
		x: lhs.y * rhs.z - rhs.y * lhs.z,
		y: lhs.x * rhs.z - rhs.x * lhs.z,
		z: lhs.x * rhs.y - rhs.x * lhs.y,
	};
};

module.exports = findVector3DProduct;
