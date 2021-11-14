const describePlaneEquation = require('./find_plane_equation');

const describeSymmetricalPoint = ({ task, solution, result }) => {
	const describedSolution = describePlaneEquation({
		task,
		solution: solution.slice(1, -9),
		result,
	}).describedSolution;

	describedSolution.push({
		description: 'Таким образом, вектор нормали к плоскости',
		action: `n = {${solution[solution.length - 9].value.join('; ')}}`,
	});

	// TODO добавить вывод t

	describedSolution.push({
		description: 'Найдём t',
		action: `t = -(A_1_x * A + A_1_y * B + A_1_z * C + D) / (A^2 + B^2 + C^2) = 
      -(${task.a1.x} * ${solution[solution.length - 10].value[0]} + 
        ${task.a1.y} * ${solution[solution.length - 10].value[1]} +
        ${task.a1.z} * ${solution[solution.length - 10].value[2]} + 
        ${solution[solution.length - 10].value[3]}) / (
          ${solution[solution.length - 10].value[0]}^2 + 
          ${solution[solution.length - 10].value[1]}^2 + 
          ${solution[solution.length - 10].value[2]}^2) = 
        ${solution[solution.length - 8].value}`,
	});

	describedSolution.push({
		description: 'Пусть A_0 - середина A_1A_2. Найдём координату x этой точки',
		action: `A_0_x = t * A + A_1_x = 
      ${solution[solution.length - 8].value} * ${
			solution[solution.length - 9].value[0]
		} + ${task.a1.x} = ${solution[solution.length - 7].value}`,
	});

	describedSolution.push({
		description: 'Найдём координату A_0_y',
		action: `A_0_y = t * B + A_1_y = 
      ${solution[solution.length - 8].value} * ${
			solution[solution.length - 9].value[1]
		} + ${task.a1.y} = ${solution[solution.length - 6].value}`,
	});

	describedSolution.push({
		description: 'Найдём координату A_0_z',
		action: `A_0_z = t * C + A_1_z = 
      ${solution[solution.length - 8].value} * ${
			solution[solution.length - 9].value[2]
		} + ${task.a1.z} = ${solution[solution.length - 5].value}`,
	});

	describedSolution.push({
		description: 'Таким образом, координаты точки A_0',
		action: `A_0 = {${solution[solution.length - 4].value.join('; ')}}`,
	});

	describedSolution.push({
		description: 'Найдём координаты вектора A_1A_0',
		action: `A_1A_0 = {A_0_x - A_1_x; A_0_y - A_1_y; A_0_z - A_1_z} = {
      ${solution[solution.length - 7].value} - ${task.a1.x}; 
      ${solution[solution.length - 6].value} - ${task.a1.y}; 
      ${solution[solution.length - 5].value} - ${task.a1.z}
    } = {${solution[solution.length - 2].value.join('; ')}}`,
	});

	describedSolution.push({
		description: 'Найдём координаты точки A_2',
		action: `A_2 = {A_1_x + A_1_A_0_x; A_1_y + A_1_A_0_y; A_1_z + A_1_A_0_z} = {
      ${task.a1.x} + ${solution[solution.length - 2].value[0]}; 
      ${task.a1.y} + ${solution[solution.length - 2].value[1]}; 
      ${task.a1.z} + ${solution[solution.length - 2].value[2]}
    } = {${solution[solution.length - 1].value.join('; ')}}`,
	});

	return { describedSolution };
};

module.exports = describeSymmetricalPoint;
