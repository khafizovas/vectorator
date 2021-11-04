import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import Solution from './Solution';

const Task = () => {
	const { id } = useParams();

	const [task, setTask] = useState(null);
	const [solution, setSolution] = useState(null);

	useEffect(() => {
		fetch(`/api/tasks/${id}`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setTask(data.task);
			});
	}, [id]);

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

		params = [...document.getElementsByTagName('input')].map((input) =>
			Number(input.value.replace(',', '.'))
		);

		const reqBody = task?.reqBodySample;
		fillReqBody(reqBody);

		fetch(`/api/tasks${task.path}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(reqBody),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setSolution(data);
			});
	};

	return (
		<div className='content'>
			<h3>{task?.name}</h3>
			<p>{task?.task}</p>

			{solution ? (
				<Solution
					task={solution.task}
					solution={solution.solution}
					describedSolution={solution.describedSolution}
					result={solution.result}
				/>
			) : (
				<form onSubmit={getSolution}>
					{task?.inputs.map((input, i) => (
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
			)}
		</div>
	);
};

export default Task;
