import React from 'react';

import Card from 'react-bootstrap/Card';

const Task = (props) => (
	<Card>
		<Card.Header>Формулировка задания</Card.Header>
		<Card.Body>
			<Card.Title>{props.name}</Card.Title>
			<Card.Text>{props.task}</Card.Text>
		</Card.Body>
	</Card>
);

export default Task;
