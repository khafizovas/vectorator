const drawCaptions = require('./drawCaptions');

const drawParallellepiped = require('./drawParallelepiped');
const drawPoints = require('./drawPoints');
const drawPoint = require('./drawPoint');
const drawCoordinate = require('./drawCoordinate');

const findCanvasCoordinates = require('./findCanvasCoordinates');

const coordinatesCaptions = {
	x: [],
	y: [],
	z: [],
};

const drawAll = (canv, drawable, enableButtons) => {
	const closure = () =>
		setTimeout(() => {
			drawCaptions({ ...canv, captions: coordinatesCaptions });
			enableButtons();
		}, drawable.length * 1000 + 1000);

	drawable.forEach((step, i) =>
		setTimeout(
			() => drawStep(step, { ...canv, captions: coordinatesCaptions }),
			1000 * i
		)
	);

	closure();
};

const drawStep = (step, canv) => {
	let isFilled = false;

	switch (step.type) {
		case 'coordinate':
			drawCoordinate(
				Array.isArray(step.value) ? { ...step, value: step.value[0] } : step,
				canv
			);
			break;

		case 'point': {
			const pointInfo = {
				...findCanvasCoordinates(step, canv),
				value: step.value,
				name: step.name,
			};

			drawPoint(pointInfo, canv, true);
			break;
		}

		case 'plane':
			isFilled = true;

		case 'vector':
		case 'parallelogram': {
			const pointsInfo = step.value.map((point, i) => {
				return {
					...findCanvasCoordinates({ value: point }, canv),
					name: step.name[i],
					value: point,
				};
			});

			drawPoints(pointsInfo, canv, isFilled);
			break;
		}

		case 'parallelepiped': {
			const parallelepipedInfo = step.value.map((elem, i) =>
				elem.map((point) => {
					return {
						...findCanvasCoordinates({ value: point }, canv),
						value: point,
						name: step.name[i],
					};
				})
			);

			drawParallellepiped(parallelepipedInfo, canv);
			break;
		}

		default:
			break;
	}
};

module.exports = drawAll;
