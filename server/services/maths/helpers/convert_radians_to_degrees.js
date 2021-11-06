/**
 * Перевести радианы в градусы.
 * @param {number} radians
 * @returns {number}
 */
const convertRadiansToDegrees = (radians) => {
	return (radians * 180) / Math.PI;
};

module.exports = convertRadiansToDegrees;
