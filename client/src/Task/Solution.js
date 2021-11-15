import React from 'react';

import SolutionIllustration from './SolutionIllustration';

const Solution = React.forwardRef((props, ref) => {
	const getResultString = () => {
		switch (props.result.type) {
			case 'point':
				return Object.entries(props.result.value)
					.map(([key, val]) => `${key} = ${val}`)
					.join('; ');
			case 'bool':
				return props.result.value ? 'Да' : 'Нет';
			case 'numbers':
				return props.result.value.join('; ');
			case 'number':
			case 'string':
				return props.result.value;

			default:
				break;
		}
	};

	return (
		<div className='solution' ref={ref}>
			<div>
				<h3>Решение:</h3>
				<ol>
					{props.describedSolution.map((step, i) => (
						<li key={`solution-step${i}`}>
							<ul>
								<li>{step.description}:</li>
								<li>{step.action}</li>
							</ul>
						</li>
					))}
				</ol>
				<h3>Ответ:</h3>
				<p>{getResultString()}</p>
			</div>
			<SolutionIllustration
				solution={props.solution}
				task={props.task}
				enableButtons={props.enableButtons}
			/>
		</div>
	);
});

export default Solution;
