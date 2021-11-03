import React, { useEffect, useRef } from 'react';

const SolutionIllustration = (props) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		const size = canvas.width;

		drawGrid(context, size);
		drawSolution(context, size);
	}, []);

	// Magic starts here
	const drawGrid = (ctx, size) => {
		ctx.beginPath();

		// OZ
		ctx.moveTo(0.5 * size, 0);
		ctx.lineTo(0.5 * size, 0.5 * size);

		// OY
		ctx.lineTo(size, 0.5 * size);

		// OX
		ctx.moveTo(0.5 * size, 0.5 * size);
		ctx.lineTo(0, size);

		ctx.stroke();

		// Captions
		ctx.font = '18px serif';
		ctx.fillText('0', 0.5 * size, 0.5 * size);
		ctx.fillText('x', 0.05, 0.95 * size);
		ctx.fillText('y', 0.95 * size, 0.5 * size);
		ctx.fillText('z', 0.5 * size, 0.05 * size);
	};

	const drawSolution = (ctx, size) => {
		const unit =
			size /
			(3 *
				Math.max(
					...props.solution
						.filter((step) => step.type !== 'number')
						.map((step) =>
							Array.isArray(step.value) ? Math.max(...step.value) : step.value
						)
				));

		props.solution.forEach((step) => drawStep(step, { ctx, size, unit }));
	};

	const drawStep = (step, canv) => {
		switch (step.type) {
			case 'coordinate':
				drawCoordinate(step, canv);
				break;

			case 'point': {
				const pointInfo = {
					...findPointCoordinates(step, canv),
					value: step.value,
					name: step.name,
				};
				drawPointProjections(pointInfo, canv);
				drawPoint(pointInfo, canv);
				break;
			}

			default:
				break;
		}
	};

	const drawCoordinate = (coordinate, canv) => {
		if (coordinate.value === 0) {
			return;
		}

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

		canv.ctx.font = '12px serif';
		canv.ctx.fillText(coordinate.value, ...canvasCoordinates.from);
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

	const drawPoint = (point, canv) => {
		canv.ctx.beginPath();

		canv.ctx.arc(...point.canvasCoordinates, 5, 0, 2 * Math.PI);

		canv.ctx.fillStyle = 'green';
		canv.ctx.fill();

		canv.ctx.fillStyle = 'black';
		canv.ctx.font = '18px serif';
		canv.ctx.fillText(
			`${point.name}(${point.value.join('; ')})`,
			...point.canvasCoordinates
		);
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

		canv.ctx.setLineDash([5, 5]);
		canv.ctx.strokeStyle = 'blue';

		canv.ctx.stroke();
	};
	// Magic ends here

	return <canvas id='illustration' ref={canvasRef} width='300' height='300' />;
};

export default SolutionIllustration;
