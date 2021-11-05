/**
 * Поиск координат вектора по координатам его начальной и конечной точек
 * @param {Point3D} first
 * @param {Point3D} second
 * @returns {Vector3D}
 */
const buildVector3D = (first, second) => {
	return {
		x: second.x - first.x,
		y: second.y - first.y,
		z: second.z - first.z,
	};
};

module.exports = buildVector3D;
