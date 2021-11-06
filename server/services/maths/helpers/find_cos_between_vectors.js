const findScalarProduct = require('./find_scalar_product');
const findVectorLength = require('./find_vector_length');

/**
 * Найти косинус угла между векторами.
 * @param {Vector3D} lhs
 * @param {Vector3D} rhs
 * @returns {number}
 */
function findCosBetweenVectors(lhs, rhs) {
	return (
		findScalarProduct(lhs, rhs) /
		(findVectorLength(lhs) * findVectorLength(rhs))
	);
}

module.exports = findCosBetweenVectors;
