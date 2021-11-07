const { findScalarProduct, findVectorLength } = require('.');

/**
 * Найти косинус угла между векторами.
 * @param {Vector3D} lhs
 * @param {Vector3D} rhs
 * @returns {number}
 */
function findCosBetweenVectors(lhs, rhs) {
	return (
		Math.abs(findScalarProduct(lhs, rhs)) /
		(findVectorLength(lhs) * findVectorLength(rhs))
	);
}

module.exports = findCosBetweenVectors;
