/**
 * Найти длину вектора.
 * @param {Vector3D} vector
 * @returns {number}
 */
const findVectorLength = (vector) => {
	return Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);
};

module.exports = findVectorLength;
