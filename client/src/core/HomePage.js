import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
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
		<div className='content'>
			{tasks?.map((task, i) => (
				<ul key={i}>
					<Link to={`tasks/${i}`}>{task.name}</Link>
				</ul>
			))}
		</div>
	);
};

export default HomePage;
