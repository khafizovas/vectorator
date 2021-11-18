const drawPoints = require('./drawPoints');

const drawParallellepiped = (parallelepiped, canv) => {
	parallelepiped.forEach((elem) => drawPoints(elem, canv));

	parallelepiped[0].forEach((point, i) =>
		drawPoints([point, parallelepiped[1][i]], canv)
	);
};

module.exports = drawParallellepiped;
