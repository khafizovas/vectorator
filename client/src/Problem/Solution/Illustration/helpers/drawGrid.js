const drawArrow = require('./drawArrow');

const drawGrid = ({ ctx, size, unit }) => {
	ctx.strokeStyle = 'Gray';
	ctx.globalAlpha = 0.5;

	drawGridAxis({ ctx, size });
	drawAxisArrows({ ctx, size, unit });
	drawAxisCaptions({ ctx, size });
};

const drawGridAxis = (canv) => {
	drawPositiveAxis(canv);
	drawNegativeAxis(canv);
};

const drawPositiveAxis = ({ ctx, size }) => {
	ctx.beginPath();

	// OZ
	ctx.moveTo(0.5 * size, 0);
	ctx.lineTo(0.5 * size, 0.5 * size);

	// OY
	ctx.lineTo(size, 0.5 * size);

	// OX
	ctx.moveTo(0.5 * size, 0.5 * size);
	ctx.lineTo(0, size);

	ctx.stroke();
};

const drawNegativeAxis = ({ ctx, size }) => {
	ctx.beginPath();

	// OZ
	ctx.moveTo(0.5 * size, size);
	ctx.lineTo(0.5 * size, 0.5 * size);

	// OY
	ctx.lineTo(0, 0.5 * size);

	// OX
	ctx.moveTo(0.5 * size, 0.5 * size);
	ctx.lineTo(size, 0);

	ctx.setLineDash([10, 10]);

	ctx.stroke();

	ctx.setLineDash([]);
};

const drawAxisArrows = (canv) => {
	// OZ
	drawArrow(
		[
			{
				canvasCoordinates: [0.5 * canv.size, 0.5 * canv.size],
			},
			{ canvasCoordinates: [0.5 * canv.size, 0] },
		],
		canv
	);

	// OY
	drawArrow(
		[
			{
				canvasCoordinates: [0.5 * canv.size, 0.5 * canv.size],
			},
			{ canvasCoordinates: [canv.size, 0.5 * canv.size] },
		],
		canv
	);

	// OX
	drawArrow(
		[
			{
				canvasCoordinates: [0.5 * canv.size, 0.5 * canv.size],
			},
			{ canvasCoordinates: [0, canv.size] },
		],
		canv
	);
};

const drawAxisCaptions = ({ ctx, size }) => {
	ctx.beginPath();

	ctx.globalAlpha = 1;
	ctx.font = 'bold italic 16px serif';
	ctx.fillStyle = 'Black';

	ctx.fillText('x', 0.025 * size, 0.925 * size);
	ctx.fillText('y', 0.95 * size, 0.55 * size);
	ctx.fillText('z', 0.525 * size, 0.05 * size);
};

module.exports = drawGrid;
