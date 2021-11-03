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
		canv.ctx.beginPath();

		switch (coordinate.name) {
			case 'x': {
				const offset = {
					x:
						0.5 * canv.size.width -
						(canv.unit * coordinate.value) / Math.sqrt(2),
					y:
						0.5 * canv.size.height +
						(canv.unit * coordinate.value) / Math.sqrt(2),
				};

				canv.ctx.moveTo(
					offset.x - canv.unit / Math.sqrt(2),
					offset.y - canv.unit / Math.sqrt(2)
				);
				canv.ctx.lineTo(offset.x + canv.unit / Math.sqrt(2), offset.y);

				break;
			}

			case 'y': {
				const offset = {
					x: 0.5 * canv.size.width + coordinate.value * canv.unit,
					y: 0.5 * canv.size.height,
				};

				canv.ctx.moveTo(offset.x, offset.y - 0.5 * canv.unit);
				canv.ctx.lineTo(offset.x, offset.y + 0.5 * canv.unit);

				break;
			}

			case 'z': {
				const offset = {
					x: 0.5 * canv.size.width,
					y: 0.5 * canv.size.height - coordinate.value * canv.unit,
				};

				canv.ctx.moveTo(offset.x - 0.5 * canv.unit, offset.y);
				canv.ctx.lineTo(offset.x + 0.5 * canv.unit, offset.y);

				break;
			}

			default:
				break;
		}

		canv.ctx.strokeStyle = 'red';
		canv.ctx.stroke();
	};

	const drawPoint = (point, canv) => {
		console.log('drawPoint', point);
	};
	// Magic ends here

	return <canvas id='illustration' ref={canvasRef} {...props} />;
};

export default SolutionIllustration;
