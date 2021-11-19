/**
 * Найти скалярное произведение векторов.
 * @param {Vector3D} lhs
 * @param {Vector3D} rhs
 * @returns {number}
 */
const findScalarProduct = (lhs, rhs) => {
	return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z;
};

module.exports = findScalarProduct;
