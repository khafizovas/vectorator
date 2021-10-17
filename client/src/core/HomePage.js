import React from 'react';
import { Link } from 'react-router-dom';

import tasks from '../tasks';

const HomePage = () => {
	return (
		<div className='content'>
			{tasks.map((task, i) => (
				<ul key={i}>
					<Link to={task.path}>{task.name}</Link>
				</ul>
			))}
		</div>
	);
};

export default HomePage;
