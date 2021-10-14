import React, { useState } from 'react';
import { Redirect } from 'react-router';

const Task = (props) => {
	const [solutionState, setSolutionState] = useState(null);

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
				setSolutionState(data);
			});
	};

	if (solutionState) {
		return <Redirect to={{ pathname: '/solution', state: solutionState }} />;
	}

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
							required
							{...(input.decimal && { step: '0.1' })}
							{...(input.min !== undefined && { min: input.min })}
							{...(input.max !== undefined && { max: input.max })}
						/>
					</div>
				))}
				<button type='submit'>Получить решение</button>
			</form>
		</div>
	);
};

export default Task;
