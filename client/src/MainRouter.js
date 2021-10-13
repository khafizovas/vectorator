import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './core/HomePage';
import Navbar from './core/Navbar';

const MainRouter = () => {
	return (
		<div>
			<Navbar />
			<Switch>
				<Route exact path='/' component={HomePage} />
			</Switch>
		</div>
	);
};

export default MainRouter;
