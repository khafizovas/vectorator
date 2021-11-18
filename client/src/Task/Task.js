import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
		<Container>
			<Card>
				<Card.Header>Формулировка задания</Card.Header>
				<Card.Body>
					<Card.Title>{task?.name}</Card.Title>
					<Card.Text>{task?.task}</Card.Text>
				</Card.Body>
			</Card>
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
					<Form onSubmit={getSolution}>
						{spliceIntoChunks(task?.inputs, 3)?.map((inputRow, j) => (
							<Row key={j}>
								{inputRow.map((input, i) => (
									<Col key={3 * j + i}>
										<Form.Group className='mb-3' controlId={i}>
											<Form.Label>{input.caption}</Form.Label>
											<OverlayTrigger
												trigger='focus'
												delay={{ hide: 1000 }}
												rootClose
												placement='bottom'
												overlay={
													<Tooltip>
														Введите {input.decimal ? 'дробное' : 'целое'} число
														{input.min !== undefined && ` от ${input.min}`}{' '}
														{input.max !== undefined && ` до ${input.max}`}
													</Tooltip>
												}>
												<Form.Control
													type='number'
													required
													{...(input.decimal && { step: '0.1' })}
													{...(input.min !== undefined && { min: input.min })}
													{...(input.max !== undefined && { max: input.max })}
												/>
											</OverlayTrigger>
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
				</Container>
			)}
		</Container>
	);
};

export default Task;
