import React, { useEffect, useRef } from 'react';

const SolutionIllustration = (props) => {
	const canvasRef = useRef(null);

	const AXIS = ['x', 'y', 'z'];
	const FIGURE_TYPES = [
		'coordinate',
		'point',
		'vector',
		'parallelogram',
		'parallelepiped',
		'plane',
	];

	const drawable = [...props.task, ...props.solution].filter((elem) =>
		FIGURE_TYPES.includes(elem.type)
	);
	const coordinatesCaptions = {
		x: [],
		y: [],
		z: [],
	};

	useEffect(() => {
		// Magic starts here
		const drawGrid = (ctx, size, unit) => {
			ctx.strokeStyle = 'Gray';
			ctx.globalAlpha = 0.5;

			drawGridAxis({ ctx, size });
			drawAxisArrows({ ctx, size, unit });
			drawAxisCaptions({ ctx, size });
		};

		const drawGridAxis = (canv) => {
			drawPositiveAxis(canv);
			drawNegativeAxis(canv);
		};

		const drawPositiveAxis = (canv) => {
			canv.ctx.beginPath();

			// OZ
			canv.ctx.moveTo(0.5 * canv.size, 0);
			canv.ctx.lineTo(0.5 * canv.size, 0.5 * canv.size);

			// OY
			canv.ctx.lineTo(canv.size, 0.5 * canv.size);

			// OX
			canv.ctx.moveTo(0.5 * canv.size, 0.5 * canv.size);
			canv.ctx.lineTo(0, canv.size);

			canv.ctx.stroke();
		};

		const drawNegativeAxis = (canv) => {
			canv.ctx.beginPath();

			// OZ
			canv.ctx.moveTo(0.5 * canv.size, canv.size);
			canv.ctx.lineTo(0.5 * canv.size, 0.5 * canv.size);

			// OY
			canv.ctx.lineTo(0, 0.5 * canv.size);

			// OX
			canv.ctx.moveTo(0.5 * canv.size, 0.5 * canv.size);
			canv.ctx.lineTo(canv.size, 0);

			canv.ctx.setLineDash([10, 10]);

			canv.ctx.stroke();

			canv.ctx.setLineDash([]);
		};

		const drawAxisArrows = (canv) => {
			// OZ
			drawArrow(
				[
					{
						canvasCoordinates: [0.5 * canv.size, 0.5 * canv.size],
					},
					{ canvasCoordinates: [0.5 * canv.size, 0] },
				],
				{ ctx: canv.ctx, size: canv.size, unit: canv.unit }
			);

			// OY
			drawArrow(
				[
					{
						canvasCoordinates: [0.5 * canv.size, 0.5 * canv.size],
					},
					{ canvasCoordinates: [canv.size, 0.5 * canv.size] },
				],
				{ ctx: canv.ctx, size: canv.size, unit: canv.unit }
			);

			// OX
			drawArrow(
				[
					{
						canvasCoordinates: [0.5 * canv.size, 0.5 * canv.size],
					},
					{ canvasCoordinates: [0, canv.size] },
				],
				{ ctx: canv.ctx, size: canv.size, unit: canv.unit }
			);
		};

		const drawAxisCaptions = (canv) => {
			canv.ctx.beginPath();

			canv.ctx.globalAlpha = 1;
			canv.ctx.font = 'bold italic 16px serif';
			canv.ctx.fillStyle = 'Black';

			canv.ctx.fillText('x', 0.025 * canv.size, 0.925 * canv.size);
			canv.ctx.fillText('y', 0.95 * canv.size, 0.55 * canv.size);
			canv.ctx.fillText('z', 0.525 * canv.size, 0.05 * canv.size);
		};

		const drawCaptions = (canv) => {
			sortCaptions();

			canv.ctx.beginPath();

			canv.ctx.globalAlpha = 1;
			canv.ctx.font = 'bold italic 12px serif';
			canv.ctx.fillStyle = 'black';

			Object.values(coordinatesCaptions).forEach((coordinates, i) =>
				coordinates.forEach((caption, j) =>
					canv.ctx.fillText(
						caption[0],
						caption[1] + (i === 2 ? (-1) ** j * 13 : 0),
						caption[2] + (i !== 2 ? (-1) ** j * 13 : 0)
					)
				)
			);
		};

		const sortCaptions = () => {
			coordinatesCaptions.x.sort((lhs, rhs) => lhs[0] - rhs[0]);
			coordinatesCaptions.y.sort((lhs, rhs) => lhs[0] - rhs[0]);
			coordinatesCaptions.z.sort((lhs, rhs) => lhs[0] - rhs[0]);
		};

		const drawWithDelay = (ctx, size, unit) => {
			const closure = () =>
				setTimeout(() => {
					drawCaptions({ ctx, unit });
					props.enableButtons();
				}, drawable.length * 1000 + 1000);

			drawable.forEach((step, i) =>
				setTimeout(() => drawStep(step, { ctx, size, unit }), 1000 * (i + 1))
			);

			closure();
		};

		const drawStep = (step, canv) => {
			let isFilled = false;

			switch (step.type) {
				case 'coordinate':
					drawCoordinate(step, canv);
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

		const drawParallellepiped = (parallelepiped, canv) => {
			parallelepiped.forEach((elem) => drawPoints(elem, canv));

			parallelepiped[0].forEach((point, i) =>
				drawPoints([point, parallelepiped[1][i]], canv)
			);
		};

		const drawPoints = (points, canv, filled = false) => {
			points.forEach((point) => drawPoint(point, canv));

			canv.ctx.beginPath();

			canv.ctx.moveTo(...points[0].canvasCoordinates);
			for (let i = 1; i < points.length; ++i) {
				canv.ctx.lineTo(...points[i].canvasCoordinates);
			}

			canv.ctx.globalAlpha = 0.75;
			canv.ctx.strokeStyle = 'MidnightBlue';

			if (points.length === 2) {
				canv.ctx.stroke();
				drawArrow(points, canv);
			} else {
				canv.ctx.moveTo(...points[points.length - 1].canvasCoordinates);
				canv.ctx.lineTo(...points[0].canvasCoordinates);

				canv.ctx.stroke();
			}

			if (filled) {
				canv.ctx.globalAlpha = 0.25;

				canv.ctx.fillStyle = 'MidnightBlue';
				canv.ctx.fill();
			}
		};

		const drawArrow = (vector, canv) => {
			const angle = Math.atan2(
				vector[1].canvasCoordinates[1] - vector[0].canvasCoordinates[1],
				vector[1].canvasCoordinates[0] - vector[0].canvasCoordinates[0]
			);

			canv.ctx.beginPath();

			canv.ctx.moveTo(...vector[1].canvasCoordinates);
			canv.ctx.lineTo(
				vector[1].canvasCoordinates[0] - 13 * Math.cos(angle - Math.PI / 6),
				vector[1].canvasCoordinates[1] - 13 * Math.sin(angle - Math.PI / 6)
			);
			canv.ctx.moveTo(...vector[1].canvasCoordinates);
			canv.ctx.lineTo(
				vector[1].canvasCoordinates[0] - 13 * Math.cos(angle + Math.PI / 6),
				vector[1].canvasCoordinates[1] - 13 * Math.sin(angle + Math.PI / 6)
			);

			canv.ctx.stroke();
		};

		const drawPoint = (point, canv, isFilled = false) => {
			point.value.forEach((coordinate, i) =>
				drawCoordinate({ name: AXIS[i], value: coordinate }, canv)
			);
			drawPointProjections(point, canv);

			if (isFilled) {
				canv.ctx.beginPath();

				canv.ctx.arc(...point.canvasCoordinates, 3, 0, 2 * Math.PI);

				canv.ctx.globalAlpha = 0.75;
				canv.ctx.fillStyle = 'Green';

				canv.ctx.fill();
			}

			canv.ctx.beginPath();

			canv.ctx.globalAlpha = 1;
			canv.ctx.fillStyle = 'Black';

			canv.ctx.fillText(point.name, ...point.canvasCoordinates);
		};

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

		const drawCoordinate = (coordinate, canv) => {
			if (coordinate.value === 0) {
				return;
			}

			const canvasCoordinates = findCanvasCoordinate(
				{ axis: coordinate.name, value: coordinate.value },
				canv
			);

			canv.ctx.beginPath();

			canv.ctx.moveTo(...canvasCoordinates.from);
			canv.ctx.lineTo(...canvasCoordinates.to);

			canv.ctx.globalAlpha = 0.5;
			canv.ctx.strokeStyle = 'DarkGray';
			canv.ctx.stroke();

			if (
				coordinatesCaptions[coordinate.name].findIndex(
					(elem) => elem[0] === coordinate.value
				) === -1
			) {
				coordinatesCaptions[coordinate.name].push([
					coordinate.value,
					...Object.values(canvasCoordinates.center),
				]);
			}
		};

		// Helpers
		const findCanvasCoordinates = (point, canv) => {
			const pointProjections = point.value.map(
				(coordinate, i) =>
					findCanvasCoordinate({ axis: AXIS[i], value: coordinate }, canv)
						.center
			);

			const pointCanvasCoordinates = [
				pointProjections[0].x + canv.unit * point.value[1],
				pointProjections[0].y - canv.unit * point.value[2],
			];

			return {
				projections: pointProjections,
				canvasCoordinates: pointCanvasCoordinates,
			};
		};

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

		// Magic ends here

		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		const size = canvas.width;

		context.lineWidth = 2;
		context.font = '14px Comic Sans MS';

		const findPointRadius = (coordinates) => {
			return Math.sqrt(
				coordinates.reduce(
					(sum, coordinate) => sum + (Math.sqrt(2) * coordinate) ** 2,
					0
				)
			);
		};

		const unit =
			(0.5 * size) /
			Math.max(
				...drawable
					.map((step) => {
						if (Array.isArray(step.value)) {
							if (Array.isArray(step.value[0])) {
								if (Array.isArray(step.value[0][0])) {
									// Parallelepiped
									return step.value.map((points) =>
										points.map((point) => findPointRadius(point))
									);
								} else {
									// Parallelogram, plane, vector
									return step.value.map((point) => findPointRadius(point));
								}
							} else {
								// Point
								return findPointRadius(step.value);
							}
						} else {
							// Coordinate
							return Math.sqrt(2) * Math.abs(step.value);
						}
					})
					.flat(Infinity)
			);

		drawGrid(context, size, unit);
		drawWithDelay(context, size, unit);
	}, [props, AXIS, FIGURE_TYPES, drawable, coordinatesCaptions]);

	return <canvas id='illustration' ref={canvasRef} width='300' height='300' />;
};

export default SolutionIllustration;
