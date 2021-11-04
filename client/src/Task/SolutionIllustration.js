import React, { useEffect, useRef } from 'react';

const SolutionIllustration = (props) => {
	const canvasRef = useRef(null);
	// TODO: Draw captions at the end

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		const size = canvas.width;

		context.lineWidth = 1;

		const unit =
			size /
			(3 *
				Math.max(
					...[...props.task, ...props.solution]
						.map((step) =>
							Array.isArray(step.value) ? step.value.flat(Infinity) : step.value
						)
						.flat(Infinity)
						.filter((step) => step.type !== 'number')
				));

		drawGrid(context, size);
		drawTask(context, size, unit);
		drawSolution(context, size, unit);
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

	const drawTask = (ctx, size, unit) => {
		props.task.forEach((elem) => drawStep(elem, { ctx, size, unit }));
	};

	const drawSolution = (ctx, size, unit) => {
		props.solution.forEach((step, i) =>
			setTimeout(() => drawStep(step, { ctx, size, unit }), 3000 * (i + 1))
		);
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

			case 'vector': {
				const axis = ['x', 'y', 'z'];
				const vectorInfo = step.value.map((point, i) => {
					return {
						...findPointCoordinates({ value: point }, canv),
						value: point,
						name: step.name.slice(i, i + 1),
					};
				});

				vectorInfo.forEach((point) =>
					point.value.forEach((coordinate, i) =>
						drawCoordinate({ value: coordinate, name: axis[i] }, canv)
					)
				);
				vectorInfo.forEach((point) => drawPointProjections(point, canv));
				drawVector(vectorInfo, canv);
				break;
			}

			default:
				break;
		}
	};

	const drawVector = (vector, canv) => {
		canv.ctx.beginPath();

		canv.ctx.moveTo(...vector[0].canvasCoordinates);
		canv.ctx.lineTo(...vector[1].canvasCoordinates);
		// Arrow
		const angle = Math.atan2(
			vector[1].canvasCoordinates[1] - vector[0].canvasCoordinates[1],
			vector[1].canvasCoordinates[0] - vector[0].canvasCoordinates[0]
		);

		canv.ctx.lineTo(
			vector[1].canvasCoordinates[0] -
				0.2 * canv.unit * Math.cos(angle - Math.PI / 6),
			vector[1].canvasCoordinates[1] -
				0.2 * canv.unit * Math.sin(angle - Math.PI / 6)
		);
		canv.ctx.moveTo(...vector[1].canvasCoordinates);
		canv.ctx.lineTo(
			vector[1].canvasCoordinates[0] -
				0.2 * canv.unit * Math.cos(angle + Math.PI / 6),
			vector[1].canvasCoordinates[1] -
				0.2 * canv.unit * Math.sin(angle + Math.PI / 6)
		);

		canv.ctx.strokeStyle = 'black';
		canv.ctx.lineWidth = 3;
		canv.ctx.stroke();

		canv.ctx.lineWidth = 1;

		vector.forEach((point) => drawPoint(point, canv, false));
	};

	const drawPoint = (
		point,
		canv,
		isVisible = true,
		showCoordinates = false
	) => {
		canv.ctx.beginPath();

		if (isVisible) {
			canv.ctx.arc(...point.canvasCoordinates, 3, 0, 2 * Math.PI);
			canv.ctx.fillStyle = 'green';
			canv.ctx.fill();
		}

		canv.ctx.fillStyle = 'black';
		canv.ctx.font = '18px serif';
		canv.ctx.fillText(
			showCoordinates ? `${point.name}(${point.value.join('; ')})` : point.name,
			...point.canvasCoordinates
		);
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
		canv.ctx.setLineDash([]);
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

	// Helpers
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

	// Magic ends here

	return <canvas id='illustration' ref={canvasRef} width='300' height='300' />;
};

export default SolutionIllustration;
