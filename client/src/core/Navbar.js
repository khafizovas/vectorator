import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) => {
	return history.location.pathname === path;
};

const Navbar = withRouter(({ history }) => (
	<nav className='navbar'>
		<Link to='/'>
			<button
				className={`navbar-item ${isActive(history, '/') ? 'active' : ''}`}>
				Главная страница
			</button>
		</Link>

		{!isActive(history, '/') && (
			<button disabled className={'navbar-item active'}>
				{isActive(history, '/solution') ? 'Решение' : 'Ввод данных'}
			</button>
		)}
	</nav>
));

export default Navbar;
