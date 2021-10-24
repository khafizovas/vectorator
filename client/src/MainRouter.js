import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './core/HomePage';
import Navbar from './core/Navbar';
import Task from './Task/Task';

const MainRouter = () => {
	return (
		<div>
			<Navbar />

			<Switch>
				<Route exact path='/'>
					<HomePage />
				</Route>

				<Route path='/tasks/:id'>
					<Task />
				</Route>
			</Switch>

			{/* <Route exact path='/task/:id' component={Task} /> */}

			{/* {tasks.map((task, i) => (
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
				))} */}
		</div>
	);
};

export default MainRouter;
