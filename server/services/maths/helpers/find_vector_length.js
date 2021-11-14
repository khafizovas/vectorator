/**
 * Найти длину вектора.
 * @param {Vector3D} vector
 * @returns {number}
 */
const findVectorLength = (vector) => {
	return Number(
		Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2).toPrecision(4)
	);
};

module.exports = findVectorLength;
