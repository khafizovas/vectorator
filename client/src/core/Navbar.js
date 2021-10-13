import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) => {
	return history.location.pathname === path;
};

const Navbar = withRouter(({ history }) => (
	<nav className='navbar'>
		<Link to='/'>
			<button className={`navbar-item ${isActive ? 'active' : ''}`}>
				Главная страница
			</button>
		</Link>
	</nav>
));

export default Navbar;
