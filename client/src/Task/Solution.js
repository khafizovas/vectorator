import React, { memo } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

import SolutionIllustration from './SolutionIllustration';

const Latex = require('react-latex');

const Solution = React.forwardRef((props, ref) => {
	const getResultString = () => {
		switch (props.result.type) {
			case 'point':
				return Object.entries(props.result.value)
					.map(([key, val]) => `${key} = ${val}`)
					.join('; ');
			case 'bool':
				return props.result.value ? 'Да' : 'Нет';
			case 'numbers':
				return props.result.value.join('; ');
			case 'number':
			case 'string':
				return props.result.value;

			default:
				break;
		}
	};

	return (
		<Container ref={ref}>
			<Row>
				<Col>
					<h3>Решение:</h3>
					<ListGroup as='ol' numbered variant='flush'>
						{props.describedSolution.map((step, i) => (
							<ListGroup.Item as='li' key={`solution-step${i}`}>
								<ListGroup>
									<ListGroup.Item as='ul' variant='secondary'>
										{step.description}:
									</ListGroup.Item>
									<ListGroup.Item as='ul'>
										<Latex>{step.action}</Latex>
									</ListGroup.Item>
								</ListGroup>
							</ListGroup.Item>
						))}
					</ListGroup>
				</Col>

				<Col md='auto'>
					<SolutionIllustration
						solution={props.solution}
						task={props.task}
						enableButtons={props.enableButtons}
					/>
					<br />

					<Card bg='light'>
						<Card.Header>Ответ:</Card.Header>
						<Card.Body>
							<Card.Text>{getResultString()}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
});

export default memo(Solution);
