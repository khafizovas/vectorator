/**
 * Транспонировать матрицу.
 * @param {number[][]} matrix
 * @returns {number[][]}
 */
const transposeMatrix = (matrix) => {
	return matrix[0].map((_, rowIndex) => matrix.map((row) => row[rowIndex]));
};

module.exports = transposeMatrix;
