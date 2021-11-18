import React, { Fragment } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

const Latex = require('react-latex');

const SolutionText = (props) => (
	<Fragment>
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
	</Fragment>
);

export default SolutionText;
