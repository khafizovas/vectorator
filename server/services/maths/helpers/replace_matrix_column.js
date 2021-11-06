/**
 *
 * @param {number[][]} matrix
 * @param {number[]} column
 * @param {number} columnIndex
 * @returns {number[][]}
 */
const replaceMatrixColumn = (matrix, column, columnIndex) => {
	return [...matrix].map((row, i) => {
		const curRow = [...row];
		curRow[columnIndex] = column[i];

		return curRow;
	});
};

module.exports = replaceMatrixColumn;
