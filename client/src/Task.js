import React from 'react';

const Task = (props) => {
	let params;
	let paramIndex = 0;

	const fillReqBody = (obj) => {
		for (let k in obj) {
			if (typeof obj[k] === 'object') {
				fillReqBody(obj[k]);
			} else {
				obj[k] = params[paramIndex];
				++paramIndex;
			}
		}
	};

	const getSolution = (ev) => {
		ev.preventDefault();

		params = [...document.getElementsByTagName('input')].map(
			(input) => input.value
		);

		const reqBody = props.reqBodySample;
		fillReqBody(reqBody);

		fetch('/api/task/ratio_point_coordinates', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(reqBody),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data.result);
				// TODO: Result component rendering
			});
	};

	// TODO: Add required and intervals
	return (
		<div className='content'>
			<h3>{props.name}</h3>
			<p>{props.task}</p>
			<form onSubmit={getSolution}>
				{props.inputs.map((input, i) => (
					<div key={i}>
						<label htmlFor={input.type + i}>{input.caption}: </label>
						<input
							type={input.type}
							id={input.type + i}
							{...(input.decimal && { step: '0.1' })}
						/>
					</div>
				))}
				<button type='submit'>Получить решение</button>
			</form>
		</div>
	);
};

export default Task;
