import React from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

const ExportMenu = (props) => {
	return (
		<ButtonGroup>
			<Button onClick={props.downloadPdf} variant='outline-dark'>
				Загрузить PDF
			</Button>{' '}
			<Button onClick={props.downloadPng} variant='outline-dark'>
				Загрузить PNG
			</Button>{' '}
			<Button onClick={props.downloadJpeg} variant='outline-dark'>
				Загрузить JPEG
			</Button>
		</ButtonGroup>
	);
};

export default ExportMenu;
