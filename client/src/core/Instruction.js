import React from 'react';

import Container from 'react-bootstrap/esm/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

import step1 from '../assets/step1.png';
import step2 from '../assets/step2.png';
import step3 from '../assets/step3.png';
import step4 from '../assets/step4.png';
import step5 from '../assets/step5.png';
import step6 from '../assets/step6.png';
import step7 from '../assets/step7.png';

const Instruction = () => {
	return (
		<Container>
			<ListGroup as='ol' numbered variant='flush'>
				<ListGroup.Item as='li'>
					Перейдите на главную страницу приложения.
					<br />
					<Image src={step1} rounded fluid={true} />
				</ListGroup.Item>
				<ListGroup.Item as='li'>
					Выберите необходимый прототип задач из предложенного списка.
					<br />
					<Image src={step2} rounded fluid={true} />
				</ListGroup.Item>
				<ListGroup.Item as='li'>
					Заполните все поля ввода в соответствии с всплывающими подсказками.
					<br />
					<Image src={step3} rounded fluid={true} />
				</ListGroup.Item>
				<ListGroup.Item as='li'>
					Нажмите на кнопку "Получить решение".
					<br />
					<Image src={step4} rounded fluid={true} />
				</ListGroup.Item>
				<ListGroup.Item as='li'>
					Дождитесь окончания анимации и появления кнопок загрузки решения,
					расположенных в конце страницы.
					<br />
					<Image src={step5} rounded fluid={true} />
				</ListGroup.Item>
				<ListGroup.Item as='li'>
					Выберите один из предложенных для загрузки форматов.
					<br />
					<Image src={step6} rounded fluid={true} />
				</ListGroup.Item>
				<ListGroup.Item as='li'>
					Дождитесь окончания загрузки файла с решением задачи.
					<br />
					<Image src={step7} rounded fluid={true} />
				</ListGroup.Item>
			</ListGroup>
		</Container>
	);
};

export default Instruction;
