import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

const Navbar = withRouter(() => (
	<nav className='navbar'>
		<Link to='/'>
			<Button variant='outline-dark'>Главная страница</Button>
		</Link>
	</nav>
));

export default Navbar;
