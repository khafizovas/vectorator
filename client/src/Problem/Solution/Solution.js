import React, { memo } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SolutionIllustration from './SolutionIllustration';
import SolutionText from './SolutionText';
import SolutionAnswer from './SolutionAnswer';

const Solution = React.forwardRef((props, ref) => {
	return (
		<Container ref={ref}>
			<Row>
				<Col>
					<SolutionText describedSolution={props.describedSolution} />
				</Col>

				<Col md='auto'>
					<SolutionIllustration
						solution={props.solution}
						task={props.task}
						enableButtons={props.enableButtons}
					/>
					<br />

					<SolutionAnswer result={props.result} />
				</Col>
			</Row>
		</Container>
	);
});

export default memo(Solution);
