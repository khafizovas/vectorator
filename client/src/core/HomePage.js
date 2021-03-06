import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

const HomePage = () => {
	const history = useHistory();
	const [tasks, setTasks] = useState(null);

	useEffect(() => {
		fetch('/api/tasks/')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setTasks(data.tasks);
			});
	}, []);

	return (
		<Container>
			<ListGroup variant='flush'>
				{tasks?.map((task, i) => (
					<ListGroup.Item
						key={i}
						action
						onClick={() => history.push(`tasks/${i}`)}>
						{task.name}
					</ListGroup.Item>
				))}
			</ListGroup>
		</Container>
	);
};

export default HomePage;
