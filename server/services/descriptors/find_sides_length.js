const describeParallelorgamSides = ({ task, solution, result }) => {
	const describedSolution = [];

	describedSolution.push({
		description: 'Найдём длину вектора AB',
		action: `|AB| = sqrt(AB_x^2 + AB_y^2 + AB_z^2) = 
      ${task.lhs.x}^2 + ${task.lhs.y}^2 + ${task.lhs.z}^2 = 
      ${solution[0].value}`,
	});

	describedSolution.push({
		description: 'Найдём длину вектора AD',
		action: `|AD| = sqrt(AD_x^2 + AD_y^2 + AD_z^2) = 
      ${task.rhs.x}^2 + ${task.rhs.y}^2 + ${task.rhs.z}^2 = 
      ${solution[1].value}`,
	});

	return { describedSolution };
};

module.exports = describeParallelorgamSides;
