const drawPoint = require('./drawPoint');
const drawArrow = require('./drawArrow');

const drawPoints = (points, canv, filled = false) => {
	points.forEach((point) => drawPoint(point, canv));

	canv.ctx.beginPath();

	canv.ctx.moveTo(...points[0].canvasCoordinates);
	for (let i = 1; i < points.length; ++i) {
		canv.ctx.lineTo(...points[i].canvasCoordinates);
	}

	canv.ctx.globalAlpha = 0.75;
	canv.ctx.strokeStyle = 'MidnightBlue';

	if (points.length === 2) {
		canv.ctx.stroke();
		drawArrow(points, canv);
	} else {
		canv.ctx.moveTo(...points[points.length - 1].canvasCoordinates);
		canv.ctx.lineTo(...points[0].canvasCoordinates);

		canv.ctx.stroke();
	}

	if (filled) {
		canv.ctx.globalAlpha = 0.25;

		canv.ctx.fillStyle = 'MidnightBlue';
		canv.ctx.fill();
	}
};

module.exports = drawPoints;
