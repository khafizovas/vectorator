const describeVectorProjection = ({ task, solution, result }) => {
	const describedSolution = [];

	describedSolution.push({
		description: 'Найдём скалярное произведение данных векторов',
		action: `AH * AA_1 = 
      ${task.lhs.x} * ${task.rhs.x} + 
      ${task.lhs.y} * ${task.rhs.y} + 
      ${task.lhs.z} * ${task.rhs.z} = 
      ${solution[0].value}`,
	});

	describedSolution.push({
		description: 'Найдём длину вектора AA_1',
		action: `|AA_1| = sqrt(AA_1_x^2 + AA_1_y^2 + AA_1_z^2) = 
      sqrt(${task.rhs.x}^2 + ${task.rhs.y}^2 + ${task.rhs.z}^2) = 
      ${solution[1].value}`,
	});

	describedSolution.push({
		description: 'Найдём искомую проекцию',
		action: `AH * AA_1 / |AA_1| = 
      ${solution[0].value} / ${solution[1].value} = 
      ${solution[2].value}`,
	});

	return describedSolution;
};

module.exports = describeVectorProjection;
