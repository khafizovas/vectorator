import React from 'react';
import SolutionIllustration from './SolutionIllustration';

const Solution = (props) => {
	return (
		<div className='solution'>
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
				<p>
					{Object.entries(props.result)
						.map(([key, val]) => `${key} = ${val}`)
						.join(', ')}
				</p>
			</div>
			<SolutionIllustration solution={props.solution} task={props.task} />
		</div>
	);
};

export default Solution;
