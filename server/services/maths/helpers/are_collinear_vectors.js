/**
 * Проверить коллинеарность векторов.
 * @param {Vector3D} lhs
 * @param {Vector3D} rhs
 * @returns {Boolean}
 */
const areCollinearVectors = (lhs, rhs) => {
	return (
		lhs.x / rhs.x === lhs.y / rhs.y &&
		lhs.y / rhs.y === lhs.z / rhs.z &&
		lhs.x / rhs.x === lhs.z / rhs.z
	);
};

module.exports = areCollinearVectors;
