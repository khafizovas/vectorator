import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './core/HomePage';
import Navbar from './core/Navbar';
import Task from './Task';
import TaskSolution from './TaskSolution';

import tasks from './tasks';

const MainRouter = () => {
	return (
		<div>
			<Navbar />
			<Switch>
				<Route path='/' exact render={() => <HomePage />} />

				{tasks.map((task) => (
					<Route
						key={task.id}
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

				<Route
					path='/solution'
					exact
					render={(props) => <TaskSolution {...props} />}
				/>
			</Switch>
		</div>
	);
};

export default MainRouter;
