/**
 * Найти координату точки, делящей вектор в заданном отношении.
 * @param {number} first
 * @param {number} second
 * @param {number} ratio
 * @returns {number}
 */
const findRatioCoordinate = (first, second, ratio) => {
	return (first + ratio * second) / (1 + ratio);
};

module.exports = findRatioCoordinate;
