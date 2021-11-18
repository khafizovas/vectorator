const findCanvasCoordinate = (coordinate, canv) => {
	switch (coordinate.axis) {
		case 'x':
			return findX(coordinate.value, canv);

		case 'y':
			return findY(coordinate.value, canv);

		case 'z':
			return findZ(coordinate.value, canv);

		default:
			return;
	}
};

const findX = (value, canv) => {
	const offset = {
		x: 0.5 * canv.size - (canv.unit * value) / Math.sqrt(2),
		y: 0.5 * canv.size + (canv.unit * value) / Math.sqrt(2),
	};

	return {
		center: offset,
		from: [offset.x - 10 / Math.sqrt(2), offset.y - 10 / Math.sqrt(2)],
		to: [offset.x + 10 / Math.sqrt(2), offset.y + 10 / Math.sqrt(2)],
	};
};

const findY = (value, canv) => {
	const offset = {
		x: 0.5 * canv.size + value * canv.unit,
		y: 0.5 * canv.size,
	};

	return {
		center: offset,
		from: [offset.x, offset.y - 10],
		to: [offset.x, offset.y + 10],
	};
};

const findZ = (value, canv) => {
	const offset = {
		x: 0.5 * canv.size,
		y: 0.5 * canv.size - value * canv.unit,
	};

	return {
		center: offset,
		from: [offset.x - 10, offset.y],
		to: [offset.x + 10, offset.y],
	};
};

module.exports = findCanvasCoordinate;
