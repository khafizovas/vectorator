import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import Task from './Task';

import Container from 'react-bootstrap/Container';

import ExportableSolution from './Solution/ExportableSolution';
import ProblemInput from './ProblemInput';

const Problem = () => {
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
		<Container>
			<Task name={task?.name} task={task?.task} />
			<br />

			{solution ? (
				<ExportableSolution
					task={solution.task.task}
					solution={solution.solution}
					describedSolution={solution.describedSolution}
					result={solution.result}
				/>
			) : (
				<Container>
					<ProblemInput getSolution={getSolution} inputs={task?.inputs} />
				</Container>
			)}
		</Container>
	);
};

export default Problem;
