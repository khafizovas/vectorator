import React, { useEffect, useRef } from 'react';

const SolutionIllustration = (props) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		const size = { width: canvas.width, height: canvas.height };

		drawGrid(context, size);
		drawSolution(context, size);
	}, []);

	// Magic starts here
	const drawGrid = (ctx, size) => {
		ctx.beginPath();

		// OZ
		ctx.moveTo(0.5 * size.width, 0);
		ctx.lineTo(0.5 * size.width, 0.5 * size.height);

		// OY
		ctx.lineTo(size.width, 0.5 * size.height);

		// OX
		ctx.moveTo(0.5 * size.width, 0.5 * size.height);
		ctx.lineTo(0, size.height);

		ctx.strokeStyle = 'black';
		ctx.stroke();

		// Captions
		ctx.fillText('0', 0.5 * size.width, 0.5 * size.height);
		ctx.fillText('x', 0.05, 0.95 * size.height);
		ctx.fillText('y', 0.95 * size.width, 0.5 * size.height);
		ctx.fillText('z', 0.5 * size.width, 0.05 * size.height);
	};

	const drawSolution = (ctx, size) => {
		// TODO: adaptive unit
		const unit = Math.min(size.width, size.height) / 20;

		props.solution.forEach((step) => drawStep(step, { ctx, size, unit }));
	};

	const drawStep = (step, canv) => {
		switch (step.type) {
			case 'coordinate':
				drawCoordinate(step, canv);
				break;

			case 'point':
				drawPoint(step, canv);
				break;

			default:
				break;
		}
	};

	const drawCoordinate = (coordinate, canv) => {
		canv.ctx.beginPath();

		let canvasCoordinates;
		switch (coordinate.name) {
			case 'x':
				canvasCoordinates = findX(coordinate.value, canv);
				break;

			case 'y':
				canvasCoordinates = findY(coordinate.value, canv);
				break;

			case 'z':
				canvasCoordinates = findZ(coordinate.value, canv);
				break;

			default:
				break;
		}

		canv.ctx.moveTo(...canvasCoordinates.from);
		canv.ctx.lineTo(...canvasCoordinates.to);

		canv.ctx.strokeStyle = 'red';
		canv.ctx.stroke();
	};

	const findX = (value, canv) => {
		const offset = {
			x: 0.5 * canv.size.width - (canv.unit * value) / Math.sqrt(2),
			y: 0.5 * canv.size.height + (canv.unit * (value - 0.5)) / Math.sqrt(2),
		};

		return {
			center: offset,
			from: [
				offset.x - canv.unit / Math.sqrt(2),
				offset.y - (0.5 * canv.unit) / Math.sqrt(2),
			],
			to: [
				offset.x + canv.unit / Math.sqrt(2),
				offset.y + (0.5 * canv.unit) / Math.sqrt(2),
			],
		};
	};

	const findY = (value, canv) => {
		const offset = {
			x: 0.5 * canv.size.width + value * canv.unit,
			y: 0.5 * canv.size.height,
		};

		return {
			center: offset,
			from: [offset.x, offset.y - 0.5 * canv.unit],
			to: [offset.x, offset.y + 0.5 * canv.unit],
		};
	};

	const findZ = (value, canv) => {
		const offset = {
			x: 0.5 * canv.size.width,
			y: 0.5 * canv.size.height - value * canv.unit,
		};

		return {
			center: offset,
			from: [offset.x - 0.5 * canv.unit, offset.y],
			to: [offset.x + 0.5 * canv.unit, offset.y],
		};
	};

	const drawPoint = (point, canv) => {
		const pointInfo = findPointCoordinates(point, canv);

		drawPointProjections(pointInfo, canv);

		canv.ctx.beginPath();

		canv.ctx.arc(
			...pointInfo.canvasCoordinates,
			0.2 * canv.unit,
			0,
			2 * Math.PI,
			true
		);

		canv.ctx.fillStyle = 'green';
		canv.ctx.fill();
	};

	const findPointCoordinates = (point, canv) => {
		const pointCoordinates = [
			findX(point.value[0], canv),
			findY(point.value[1], canv),
			findZ(point.value[2], canv),
		].map((coordinate) => coordinate.center);

		const pointCanvasCoordinates = [
			pointCoordinates[0].x + canv.unit * point.value[1],
			pointCoordinates[0].y - canv.unit * point.value[2],
		];

		return {
			coordinates: pointCoordinates,
			canvasCoordinates: pointCanvasCoordinates,
		};
	};

	const drawPointProjections = (point, canv) => {
		canv.ctx.beginPath();

		canv.ctx.moveTo(point.coordinates[0].x, point.coordinates[0].y);
		canv.ctx.lineTo(point.canvasCoordinates[0], point.coordinates[0].y);
		canv.ctx.lineTo(point.coordinates[1].x, point.coordinates[1].y);

		canv.ctx.moveTo(point.canvasCoordinates[0], point.coordinates[0].y);
		canv.ctx.lineTo(...point.canvasCoordinates);
		canv.ctx.lineTo(point.coordinates[2].x, point.coordinates[2].y);

		canv.ctx.setLineDash([1, 1]);
		canv.ctx.strokeStyle = 'blue';

		canv.ctx.stroke();
	};
	// Magic ends here

	return <canvas id='illustration' ref={canvasRef} {...props} />;
};

export default SolutionIllustration;
