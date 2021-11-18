import React from 'react';

import Card from 'react-bootstrap/Card';

const getResultString = (result) => {
	switch (result.type) {
		case 'point':
			return Object.entries(result.value)
				.map(([key, val]) => `${key} = ${val}`)
				.join('; ');
		case 'bool':
			return result.value ? 'Да' : 'Нет';
		case 'numbers':
			return result.value.join('; ');
		case 'number':
		case 'string':
			return result.value;

		default:
			break;
	}
};

const SolutionAnswer = (props) => (
	<Card bg='light'>
		<Card.Header>Ответ:</Card.Header>
		<Card.Body>
			<Card.Text>{getResultString(props.result)}</Card.Text>
		</Card.Body>
	</Card>
);

export default SolutionAnswer;
