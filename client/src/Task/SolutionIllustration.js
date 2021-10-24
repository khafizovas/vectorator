import React, { useEffect, useRef } from 'react';

const SolutionIllustration = (props) => {
	const canvasRef = useRef(null);

	const drawGrid = (ctx, { width, height }) => {
		ctx.beginPath();

		// OZ
		ctx.moveTo(0.5 * width, 0);
		ctx.lineTo(0.5 * width, 0.5 * height);

		// OY
		ctx.lineTo(width, 0.5 * height);

		// OX
		ctx.moveTo(0.5 * width, 0.5 * height);
		ctx.lineTo(0, height);

		ctx.stroke();

		// Captions
		ctx.fillText('0', 0.5 * width, 0.5 * height);
		ctx.fillText('x', 0.05, 0.95 * height);
		ctx.fillText('y', 0.95 * width, 0.5 * height);
		ctx.fillText('z', 0.5 * width, 0.05 * height);
	};

	useEffect(() => {
		const canvas = canvasRef.current;

		const context = canvas.getContext('2d');
		context.font = '12px bold';

		const size = { width: canvas.width, height: canvas.height };

		drawGrid(context, size);
	}, []);

	return <canvas id='illustration' ref={canvasRef} {...props} />;
};

export default SolutionIllustration;
