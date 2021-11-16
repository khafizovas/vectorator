import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import ExportableSolution from './ExportableSolution';

// TODO add keyboard

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
			});
	}, [key]);

	const spliceIntoChunks = (arr, chunkSize) => {
		if (!arr) {
			return;
		}

		const res = [];

		while (arr.length > 0) {
			const chunk = arr.splice(0, chunkSize);
			res.push(chunk);
		}

		return res;
	};

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
					<Form onSubmit={getSolution}>
						{spliceIntoChunks(task?.inputs, 3)?.map((inputRow) => (
							<Row>
								{inputRow.map((input, i) => (
									<Col>
										<Form.Group key={i} className='mb-3' controlId={i}>
											<Form.Label>{input.caption}</Form.Label>
											<Form.Control
												type='number'
												required
												{...(input.decimal && { step: '0.1' })}
												{...(input.min !== undefined && { min: input.min })}
												{...(input.max !== undefined && { max: input.max })}
											/>
										</Form.Group>
									</Col>
								))}
							</Row>
						))}

						{task && (
							<Button type='submit' variant='outline-dark'>
								Получить решение
							</Button>
						)}
					</Form>
				)}
			</div>
		</>
	);
};

export default Task;
