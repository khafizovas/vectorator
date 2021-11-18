const drawPointProjections = (point, canv) => {
	if (point.value.filter((coordinate) => !coordinate).length > 2) {
		return;
	}

	canv.ctx.beginPath();

	canv.ctx.moveTo(point.projections[0].x, point.projections[0].y);
	canv.ctx.lineTo(point.canvasCoordinates[0], point.projections[0].y);
	canv.ctx.lineTo(point.projections[1].x, point.projections[1].y);

	canv.ctx.moveTo(point.canvasCoordinates[0], point.projections[0].y);
	canv.ctx.lineTo(...point.canvasCoordinates);
	canv.ctx.lineTo(point.projections[2].x, point.projections[2].y);

	canv.ctx.setLineDash([5, 5]);
	canv.ctx.globalAlpha = 0.75;
	canv.ctx.strokeStyle = 'MediumTurquoise';

	canv.ctx.stroke();
	canv.ctx.setLineDash([]);
};

module.exports = drawPointProjections;
