const describePlaneEquation = require('./find_plane_equation');

const describeDistanceBetweenLines = ({ task, solution, result }) => {
	let describedSolution = [];

	describedSolution.push({
		description: 'Найдём координаты вектора AD',
		action: `AD = {D_x - A_x; D_y - A_y; D_z - A_z} = {
			${task.d.x} - ${task.a.x}; 
			${task.d.y} - ${task.a.y}; 
			${task.d.z} - ${task.a.z}} = {
			${solution[1].value.join('; ')}
		}`,
	});

	describedSolution.push({
		description: 'Найдём координаты точки C',
		action: `C = {B_x - AD_x; B_y - AD_y; B_z - AD_z} = {
			${task.b.x} - ${solution[1].value[0]}; 
			${task.b.y} - ${solution[1].value[1]}; 
			${task.b.z} - ${solution[1].value[2]}} = {
			${solution[2].value.join('; ')}
		}`,
	});

	describedSolution = [
		...describedSolution,
		...describePlaneEquation({
			task,
			solution: solution.slice(5, -1),
			result,
		}).describedSolution,
	];

	describedSolution.push({
		description:
			'Найдём расстояние между плоскостью, содержащей AB, и точкой C, принадлежащей CC_1',
		action: `d = 
      |A * C_x + B * C_y + C * C_z + D| / sqrt(A^2 + B^2 + C^2) = |
        ${solution[solution.length - 2].value[0]} * ${solution[2].value[0]} + 
        ${solution[solution.length - 2].value[1]} * ${solution[2].value[1]} + 
        ${solution[solution.length - 2].value[2]} * ${solution[2].value[2]} + 
        ${solution[solution.length - 2].value[3]}
      | / sqrt(${solution[solution.length - 2].value[0]}^2 + 
				${solution[solution.length - 2].value[1]}^2 + 
				${solution[solution.length - 2].value[2]}^2) = 
			${solution[solution.length - 1].value}`,
	});

	return { describedSolution };
};

module.exports = describeDistanceBetweenLines;
