import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import KioskBoard from 'kioskboard';

import ExportableSolution from './ExportableSolution';

const Task = () => {
	const { key } = useParams();

	const [task, setTask] = useState(null);
	const [solution, setSolution] = useState(null);

	useEffect(() => {
		fetch(`/api/tasks/${key}`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setTask(data.task);

				KioskBoard.Run('input', {
					keysArrayOfObjects: [
						{ 0: '7', 1: '8', 2: '9' },
						{ 0: '4', 1: '5', 2: '6' },
						{ 0: '1', 1: '2', 2: '3' },
						{ 0: ',', 1: '0' },
					],
					theme: 'oldschool',
					keysAllowSpacebar: false,
					keysSpacebarText: ' ',
					specialCharactersObject: null,
					keysFontFamily: 'Gost',
				});
			});
	}, [key]);

	let params;
	let paramIndex = 0;

	const fillReqBody = (obj) => {
		for (let k in obj) {
			if (typeof obj[k] === 'object' && obj[k] !== null) {
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

		const reqBody = JSON.parse(JSON.stringify(task.reqBodySample));
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
				setSolution({ ...data, task: JSON.parse(data.task) });
			});
	};

	return (
		<>
			<div className='content'>
				<h3>{task?.name}</h3>
				<p>{task?.task}</p>

				{solution ? (
					<ExportableSolution
						task={solution.task.task}
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
									type='text'
									inputMode='numeric'
									id={input.type + i}
									required
									data-kioskboard-type='keyboard'
									data-kioskboard-specialcharacters='false'
									{...(input.decimal && { step: '0.1' })}
									{...(input.min !== undefined && { min: input.min })}
									{...(input.max !== undefined && { max: input.max })}
								/>
							</div>
						))}
						{task && <button type='submit'>Получить решение</button>}
					</form>
				)}
			</div>
		</>
	);
};

export default Task;
