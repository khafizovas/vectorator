const findCanvasCoordinate = require('./findCanvasCoordinate');

const drawCoordinate = (coordinate, canv) => {
	if (coordinate.value === 0) {
		return;
	}

	const canvasCoordinates = findCanvasCoordinate(
		{ axis: coordinate.name, value: coordinate.value },
		canv
	);

	canv.ctx.beginPath();

	canv.ctx.moveTo(...canvasCoordinates.from);
	canv.ctx.lineTo(...canvasCoordinates.to);

	canv.ctx.globalAlpha = 0.5;
	canv.ctx.strokeStyle = 'DarkGray';
	canv.ctx.stroke();

	if (
		canv.captions[coordinate.name].findIndex(
			(elem) => elem[0] === coordinate.value
		) === -1
	) {
		canv.captions[coordinate.name].push([
			coordinate.value,
			...Object.values(canvasCoordinates.center),
		]);
	}
};

module.exports = drawCoordinate;
