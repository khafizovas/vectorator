import React, { useEffect, useRef } from 'react';

// TODO move functions into separate file
const SolutionIllustration = (props) => {
	const canvasRef = useRef(null);
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

		// TODO Grid drawing
		const drawGrid = (ctx, size, unit) => {
			drawGridAxis({ ctx, size });
			drawAxisArrows({ ctx, size }, unit);
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

			canv.ctx.strokeStyle = 'gray';
			canv.ctx.globalAlpha = 0.5;

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

			canv.ctx.strokeStyle = 'gray';
			canv.ctx.globalAlpha = 0.5;
			canv.ctx.setLineDash([10, 10]);

			canv.ctx.stroke();

			canv.ctx.setLineDash([]);
		};

		const drawAxisArrows = (canv, unit) => {
			// OZ
			drawArrow(
				[
					{
						canvasCoordinates: [0.5 * canv.size, 0.5 * canv.size],
					},
					{ canvasCoordinates: [0.5 * canv.size, 0] },
				],
				{ ctx: canv.ctx, size: canv.size, unit }
			);

			// OY
			drawArrow(
				[
					{
						canvasCoordinates: [0.5 * canv.size, 0.5 * canv.size],
					},
					{ canvasCoordinates: [canv.size, 0.5 * canv.size] },
				],
				{ ctx: canv.ctx, size: canv.size, unit }
			);

			// OX
			drawArrow(
				[
					{
						canvasCoordinates: [0.5 * canv.size, 0.5 * canv.size],
					},
					{ canvasCoordinates: [0, canv.size] },
				],
				{ ctx: canv.ctx, size: canv.size, unit }
			);
		};

		const drawAxisCaptions = (canv) => {
			canv.ctx.beginPath();

			canv.ctx.globalAlpha = 1;
			canv.ctx.fillStyle = 'black';

			canv.ctx.fillText('x', 0.05 * canv.size, 0.95 * canv.size);
			canv.ctx.fillText('y', 0.95 * canv.size, 0.55 * canv.size);
			canv.ctx.fillText('z', 0.55 * canv.size, 0.05 * canv.size);
		};

		// TODO Figures drawing
		const drawWithDelay = (ctx, size, unit) => {
			const closure = () =>
				setTimeout(
					() => drawCaptions(ctx, unit),
					drawable.length * 3000 + 1000
				);

			drawable.forEach((step, i) =>
				setTimeout(() => drawStep(step, { ctx, size }, unit), 3000 * (i + 1))
			);

			closure();
		};

		const drawCaptions = (ctx, unit) => {
			sortCaptions();

			ctx.font = 'bold italic 12px serif';
			ctx.fillStyle = 'black';

			Object.values(coordinatesCaptions).forEach((coordinates, i) =>
				coordinates.forEach((caption, j) =>
					ctx.fillText(
						caption[0],
						caption[1] + (i !== 1 ? (-1) ** j * unit : 0),
						caption[2] + (i === 1 ? (-1) ** j * unit : 0)
					)
				)
			);
		};

		const sortCaptions = () => {
			coordinatesCaptions.x.sort((lhs, rhs) => lhs[0] - rhs[0]);
			coordinatesCaptions.y.sort((lhs, rhs) => lhs[0] - rhs[0]);
			coordinatesCaptions.z.sort((lhs, rhs) => lhs[0] - rhs[0]);
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

					drawPoint(pointInfo, canv);
					break;
				}

				case 'vector': {
					const vectorInfo = step.value.map((point, i) => {
						return {
							...findPointCoordinates({ value: point }, canv),
							value: point,
							name: step.name[i],
						};
					});

					drawVector(vectorInfo, canv);
					break;
				}

				case 'plane': {
					const planeInfo = step.value.map((point, i) => {
						return {
							...findPointCoordinates({ value: point }, canv),
							value: point,
							name: step.name[i],
						};
					});

					drawParallelogram(planeInfo, canv, true);
					break;
				}

				case 'parallelogram': {
					const parallelogramInfo = step.value.map((point, i) => {
						return {
							...findPointCoordinates({ value: point }, canv),
							value: point,
							name: step.name[i],
						};
					});

					drawParallelogram(parallelogramInfo, canv);
					break;
				}

				case 'parallelepiped': {
					const parallelepipedInfo = step.value.map((elem, i) =>
						elem.map((point, j) => {
							return {
								...findPointCoordinates({ value: point }, canv),
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
			parallelepiped.forEach((elem) => drawParallelogram(elem, canv));

			parallelepiped[0].forEach((point, i) =>
				drawVector([point, parallelepiped[1][i]], canv, false)
			);
		};

		const drawParallelogram = (parallelogram, canv, filled = false) => {
			parallelogram.forEach((point) => drawPoint(point, canv, false));

			canv.ctx.beginPath();

			canv.ctx.moveTo(...parallelogram[0].canvasCoordinates);
			for (let i = 1; i < parallelogram.length; ++i) {
				canv.ctx.lineTo(...parallelogram[i].canvasCoordinates);
			}
			canv.ctx.lineTo(...parallelogram[0].canvasCoordinates);

			canv.ctx.strokeStyle = 'black';
			canv.ctx.stroke();
			if (filled) {
				canv.ctx.globalAlpha = 0.5;
				canv.ctx.fillStyle = 'blue';
				canv.ctx.fill();
				canv.ctx.globalAlpha = 1;
			}
		};

		const drawVector = (vector, canv, arrow = true) => {
			vector.forEach((point) => drawPoint(point, canv, false));

			canv.ctx.beginPath();

			canv.ctx.moveTo(...vector[0].canvasCoordinates);
			canv.ctx.lineTo(...vector[1].canvasCoordinates);

			canv.ctx.strokeStyle = 'black';
			canv.ctx.stroke();

			if (arrow) {
				drawArrow(vector, canv);
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
				vector[1].canvasCoordinates[0] -
					canv.unit * Math.cos(angle - Math.PI / 6),
				vector[1].canvasCoordinates[1] -
					canv.unit * Math.sin(angle - Math.PI / 6)
			);
			canv.ctx.moveTo(...vector[1].canvasCoordinates);
			canv.ctx.lineTo(
				vector[1].canvasCoordinates[0] -
					canv.unit * Math.cos(angle + Math.PI / 6),
				vector[1].canvasCoordinates[1] -
					canv.unit * Math.sin(angle + Math.PI / 6)
			);

			canv.ctx.stroke();
		};

		const drawPoint = (
			point,
			canv,
			isVisible = true,
			showCoordinates = false
		) => {
			const AXIS = ['x', 'y', 'z'];

			point.value.forEach((coordinate, i) =>
				drawCoordinate({ name: AXIS[i], value: coordinate }, canv)
			);
			drawPointProjections(point, canv);

			canv.ctx.beginPath();

			if (isVisible) {
				canv.ctx.arc(...point.canvasCoordinates, 3, 0, 2 * Math.PI);
				canv.ctx.fillStyle = 'green';
				canv.ctx.fill();
			}

			canv.ctx.fillStyle = 'black';
			canv.ctx.fillText(
				showCoordinates
					? `${point.name}(${point.value.join('; ')})`
					: point.name,
				...point.canvasCoordinates
			);
		};

		const drawPointProjections = (point, canv) => {
			if (point.value.filter((coordinate) => !coordinate).length > 1) {
				return;
			}

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

			canv.ctx.fillStyle = 'black';
			// canv.ctx.fillText(coordinate.value, ...canvasCoordinates.from);
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
	}, [FIGURE_TYPES, drawable, coordinatesCaptions]);

	return <canvas id='illustration' ref={canvasRef} width='300' height='300' />;
};

export default SolutionIllustration;
