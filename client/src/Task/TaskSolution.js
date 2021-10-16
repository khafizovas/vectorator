import React from 'react';

const TaskSolution = (props) => {
	return (
		<div>
			<h3>Решение:</h3>
			<ol>
				{props.solution.map((step, i) => (
					<li key={`solution-step${i}`}>
						<ul>
							<li>{step.caption}:</li>
							<li>
								{step.name} = {step.equals}
							</li>
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
	);
};

export default TaskSolution;
