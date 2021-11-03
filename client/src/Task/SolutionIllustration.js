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

		let lineCoordinates;
		switch (coordinate.name) {
			case 'x':
				lineCoordinates = findX(coordinate.value, canv);
				break;

			case 'y':
				lineCoordinates = findY(coordinate.value, canv);
				break;

			case 'z':
				lineCoordinates = findZ(coordinate.value, canv);
				break;

			default:
				break;
		}

		canv.ctx.moveTo(...lineCoordinates.from);
		canv.ctx.lineTo(...lineCoordinates.to);

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
		const coordinates = [
			findX(point.value[0], canv),
			findY(point.value[1], canv),
			findZ(point.value[2], canv),
		].map((coordinate) => coordinate.center);
	};
	// Magic ends here

	return <canvas id='illustration' ref={canvasRef} {...props} />;
};

export default SolutionIllustration;
