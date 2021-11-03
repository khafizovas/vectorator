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
		console.log('drawCoordinate', coordinate);

		switch (coordinate.name) {
			case 'x':
				break;

			case 'y':
				break;

			case 'z': {
				const location = 0.5 * canv.size.height - coordinate.value * canv.unit;

				canv.ctx.beginPath();

				canv.ctx.moveTo(0.5 * canv.size.width - 0.5 * canv.unit, location);
				canv.ctx.lineTo(0.5 * canv.size.width + 0.5 * canv.unit, location);

				canv.ctx.strokeStyle = 'red';
				canv.ctx.stroke();

				canv.ctx.fillText(
					coordinate.value,
					0.5 * canv.size.width + 0.5 * canv.unit,
					location
				);

				break;
			}

			default:
				break;
		}
	};
	const drawPoint = (point, canv) => {
		console.log('drawPoint', point);
	};
	// Magic ends here

	return <canvas id='illustration' ref={canvasRef} {...props} />;
};

export default SolutionIllustration;
