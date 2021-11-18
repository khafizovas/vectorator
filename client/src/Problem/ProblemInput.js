import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';

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

const ProblemInput = (props) => (
	<Form onSubmit={props.getSolution}>
		{spliceIntoChunks(props.inputs, 3)?.map((inputRow, j) => (
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

		<Button type='submit' variant='outline-dark'>
			Получить решение
		</Button>
	</Form>
);

export default ProblemInput;
