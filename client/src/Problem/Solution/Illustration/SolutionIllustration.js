import React, { useEffect, useRef } from 'react';

const { FIGURE_TYPES } = require('./helpers/constants');

const findUnit = require('./helpers/findUnit');
const drawGrid = require('./helpers/drawGrid');
const drawAll = require('./helpers/drawAll');

const SolutionIllustration = (props) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;

		const drawable = [...props.task, ...props.solution].filter((elem) =>
			FIGURE_TYPES.includes(elem.type)
		);

		const context = canvas.getContext('2d');
		const size = canvas.width;
		const unit = findUnit(size, drawable);

		context.lineWidth = 2;
		context.font = '14px Comic Sans MS';

		drawGrid({ ctx: context, size, unit });
		drawAll({ ctx: context, size, unit }, drawable, props.enableButtons);
	}, [props, canvasRef]);

	return <canvas id='illustration' ref={canvasRef} width='300' height='300' />;
};

export default SolutionIllustration;
