const transposeMatrix = require('./transpose_matrix');

/**
 * @param {Vector3D[]} vectors
 * @param {boolean} [transposed=false]
 * @returns {number[][]}
 */
const convertVectorsToMatrix = (vectors, transposed = false) => {
	let matrix = vectors.map((vector) => Object.values(vector));

	if (transposed) {
		matrix = transposeMatrix(matrix);
	}

	return matrix;
};

module.exports = convertVectorsToMatrix;
