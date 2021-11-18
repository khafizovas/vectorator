const drawCaptions = ({ ctx, captions }) => {
	sortCaptions(captions);
	console.log(captions);

	ctx.beginPath();

	ctx.globalAlpha = 1;
	ctx.font = 'bold italic 12px serif';
	ctx.fillStyle = 'black';

	Object.values(captions).forEach((coordinates, i) =>
		coordinates.forEach((caption, j) =>
			ctx.fillText(
				caption[0],
				caption[1] + (i === 2 ? (-1) ** j * 13 : 0),
				caption[2] + (i !== 2 ? (-1) ** j * 13 : 0)
			)
		)
	);
};

const sortCaptions = (captions) => {
	captions.x.sort((lhs, rhs) => lhs[0] - rhs[0]);
	captions.y.sort((lhs, rhs) => lhs[0] - rhs[0]);
	captions.z.sort((lhs, rhs) => lhs[0] - rhs[0]);
};

module.exports = drawCaptions;
