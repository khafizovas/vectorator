import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Navigation = () => (
	<Navbar bg='dark' variant='dark'>
		<Navbar.Brand as={Link} to='/' exact='true'>
			Vectorator
		</Navbar.Brand>

		<Nav variant='tabs' defaultActiveKey='/'>
			<Nav.Item>
				<Nav.Link as={Link} to='/' exact='true'>
					Главная страница
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link as={Link} to='/instruction'>
					Инструкция
				</Nav.Link>
			</Nav.Item>
		</Nav>
	</Navbar>
);

export default Navigation;
