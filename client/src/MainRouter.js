import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './core/HomePage';
import Instruction from './core/Instruction';
import Navbar from './core/Navbar';
import Problem from './Problem/Problem';

const MainRouter = () => {
	return (
		<div>
			<Navbar />

			<Switch>
				<Route exact path='/'>
					<HomePage />
				</Route>

				<Route path='/instruction'>
					<Instruction />
				</Route>

				<Route path='/tasks/:key'>
					<Problem />
				</Route>
			</Switch>
		</div>
	);
};

export default MainRouter;
