/**
 * Найти определитель матрицы
 * @param {number[][]} matrix
 * @returns {number}
 */
const findMatrixDeterminant = (matrix) => {
	if (matrix.length === 1) {
		return matrix[0][0] ?? null;
	}

	if (matrix.length === 2) {
		return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
	}

	return matrix[0].reduce(
		(det, cur, i) =>
			det +
			(-1) ** i *
				cur *
				findMatrixDeterminant(
					matrix.slice(1).map((row) => row.filter((_, j) => j !== i))
				),
		0
	);
};

module.exports = findMatrixDeterminant;
