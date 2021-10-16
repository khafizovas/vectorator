import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './core/HomePage';
import Navbar from './core/Navbar';
import Task from './Task/Task';

import tasks from './tasks';

const MainRouter = () => {
	return (
		<div>
			<Navbar />

			<Switch>
				<Route path='/' exact render={() => <HomePage />} />

				{tasks.map((task, i) => (
					<Route
						key={i}
						path={task.path}
						exact
						render={() => (
							<Task
								name={task.name}
								task={task.task}
								inputs={task.inputs}
								reqBodySample={task.reqBodySample}
								path={task.path}
							/>
						)}
					/>
				))}
			</Switch>
		</div>
	);
};

export default MainRouter;
