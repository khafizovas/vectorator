const describeParallelogram = ({ task, solution, result }) => {
	const describedSolution = [];

	describedSolution.push({
		description: 'Найдём вектор AB',
		action: `AB = {B_x - A_x; B_y - A_y; B_z - A_z} = 
			{${task.b.x} - ${task.a.x}; ${task.b.y} - ${task.a.y}; ${task.b.z} - ${task.a.z}} = 
			{${solution[0].value[0]}; ${solution[0].value[1]}; ${solution[0].value[2]}}`,
	});

	describedSolution.push({
		description: 'Найдём вектор AD',
		action: `AD = {D_x - A_x; D_y - A_y; D_z - A_z} = 
			{${task.d.x} - ${task.a.x}; ${task.d.y} - ${task.a.y}; ${task.d.z} - ${task.a.z}} = 
			{${solution[1].value[0]}; ${solution[1].value[1]}; ${solution[1].value[2]}}`,
	});

	describedSolution.push({
		description: 'Проверим, коллинеарны ли векторы',
		action: `AB_x / AD_x = AB_y / AD_y = AB_z / AD_z = 
    	${solution[0].value[0]}/${solution[1].value[0]} = 
			${solution[0].value[1]}/${solution[1].value[1]} = 
			${solution[0].value[2]}/${solution[1].value[2]}
			${result.value ? 'верно' : 'неверно'} => 
    ${result.value ? 'векторы коллинеарны' : 'векторы не коллинеарны'}`,
	});

	if (!solution[0].value) {
		describedSolution.push({
			description: 'Найдём координаты точки C',
			action: `C = {B_x + AD_x; B_y + AD_y; B_z + AD_z} = 
				{${task.b.x} + ${solution[1].value[0]}; 
				${task.b.y} + ${solution[1].value[1]}; 
				${task.b.z} + ${solution[1].value[2]}} = 
				{${solution[3].value.join('; ')}}`,
		});

		describedSolution.push({
			description: 'Построим параллелограмм ABCD',
			action: `A(${solution[4].value[0].join('; ')}), 
				B(${solution[4].value[1].join('; ')}), 
				C(${solution[4].value[2].join('; ')}), 
				D(${solution[4].value[3].join('; ')})`,
		});

		// describedSolution.push({
		// 	description: 'Вычислим длину AB',
		// 	action: `${solution[3].name} = sqrt((AB_x)^2 + (AB_y)^2 + (AB_z)^2) = sqrt(${task.lhs.x}^2 + ${task.lhs.y}^2 + ${task.lhs.z}^2) = ${solution[3].value}`,
		// });

		// describedSolution.push({
		// 	description: 'Вычислим длину AD',
		// 	action: `${solution[4].name} = sqrt((AD_x)^2 + (AD_y)^2 + (AD_z)^2) = sqrt(${task.rhs.x}^2 + ${task.rhs.y}^2 + ${task.rhs.z}^2) = ${solution[4].value}`,
		// });
	}

	return { describedSolution: describedSolution };
};

module.exports = describeParallelogram;
