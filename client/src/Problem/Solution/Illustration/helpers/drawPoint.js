const { AXIS } = require('./constants');

const drawCoordinate = require('./drawCoordinate');
const drawPointProjections = require('./drawPointProjections');

const drawPoint = (point, canv, isFilled = false) => {
	point.value.forEach((coordinate, i) =>
		drawCoordinate({ name: AXIS[i], value: coordinate }, canv)
	);
	drawPointProjections(point, canv);

	if (isFilled) {
		canv.ctx.beginPath();

		canv.ctx.arc(...point.canvasCoordinates, 3, 0, 2 * Math.PI);

		canv.ctx.globalAlpha = 0.75;
		canv.ctx.fillStyle = 'Green';

		canv.ctx.fill();
	}

	canv.ctx.beginPath();

	canv.ctx.globalAlpha = 1;
	canv.ctx.fillStyle = 'Black';

	canv.ctx.fillText(point.name, ...point.canvasCoordinates);
};

module.exports = drawPoint;
