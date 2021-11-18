const drawArrow = (vector, canv) => {
	const angle = Math.atan2(
		vector[1].canvasCoordinates[1] - vector[0].canvasCoordinates[1],
		vector[1].canvasCoordinates[0] - vector[0].canvasCoordinates[0]
	);

	canv.ctx.beginPath();

	canv.ctx.moveTo(...vector[1].canvasCoordinates);
	canv.ctx.lineTo(
		vector[1].canvasCoordinates[0] - 13 * Math.cos(angle - Math.PI / 6),
		vector[1].canvasCoordinates[1] - 13 * Math.sin(angle - Math.PI / 6)
	);
	canv.ctx.moveTo(...vector[1].canvasCoordinates);
	canv.ctx.lineTo(
		vector[1].canvasCoordinates[0] - 13 * Math.cos(angle + Math.PI / 6),
		vector[1].canvasCoordinates[1] - 13 * Math.sin(angle + Math.PI / 6)
	);

	canv.ctx.stroke();
};

module.exports = drawArrow;
