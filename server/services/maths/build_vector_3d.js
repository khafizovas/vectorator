/**
 * @typedef {Object} Point3D
 * @property {number} x - The X Coordinate
 * @property {number} y - The Y Coordinate
 * @property {number} z - The Z Coordinate
 */

/**
 * @typedef {Object} Vector3D
 * @property {number} x - The i Coordinate
 * @property {number} y - The j Coordinate
 * @property {number} z - The k Coordinate
 */

/**
 * Найти координаты вектора по координатам его начальной и конечной точек.
 * @param {Point3D} first
 * @param {Point3D} second
 * @returns {Vector3D}
 */
const buildVector3D = (first, second) => {
	return {
		x: Number((second.x - first.x).toPrecision(4)),
		y: Number((second.y - first.y).toPrecision(4)),
		z: Number((second.z - first.z).toPrecision(4)),
	};
};

module.exports = buildVector3D;
