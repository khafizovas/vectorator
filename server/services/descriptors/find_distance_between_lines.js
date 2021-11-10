const describePlaneEquation = require('./find_plane_equation');

const describeDistanceBetweenLines = ({ task, solution, result }) => {
	const describedSolution = [
		...describePlaneEquation({ task, solution: solution.slice(1), result }),
	];

	describedSolution.push({
		description:
			'Найдём расстояние между плоскостью, содержащей AB, и точкой C, принадлежащей CC_1',
		action: `d = 
      |A * C_x + B * C_y + C * C_z + D| / sqrt(A^2 + B^2 + C^2) = |
        ${solution[solution.length - 2].value[0]} * ${task.c.x} + 
        ${solution[solution.length - 2].value[1]} * ${task.c.y} + 
        ${solution[solution.length - 2].value[2]} * ${task.c.z} + 
        ${solution[solution.length - 2].value[3]}
      | / sqrt(${solution[solution.length - 2].value[0]}^2 + 
				${solution[solution.length - 2].value[1]}^2 + 
				${solution[solution.length - 2].value[2]}^2) = 
			${solution[solution.length - 1].value}`,
	});

	return describedSolution;
};

module.exports = describeDistanceBetweenLines;
