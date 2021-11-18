const { AXIS } = require('./constants');

const findCanvasCoordinate = require('./findCanvasCoordinate');

const findCanvasCoordinates = (point, canv) => {
	const pointProjections = point.value.map(
		(coordinate, i) =>
			findCanvasCoordinate({ axis: AXIS[i], value: coordinate }, canv).center
	);

	const pointCanvasCoordinates = [
		pointProjections[0].x + canv.unit * point.value[1],
		pointProjections[0].y - canv.unit * point.value[2],
	];

	return {
		projections: pointProjections,
		canvasCoordinates: pointCanvasCoordinates,
	};
};

module.exports = findCanvasCoordinates;
