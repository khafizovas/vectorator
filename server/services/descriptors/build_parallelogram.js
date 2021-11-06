const describeParallelogram = ({ task, solution, result }) => {
	const describedSolution = [];

	describedSolution.push({
		description: 'Проверим, коллинеарны ли векторы',
		action: `AB_x / AD_x = AB_y / AD_y = AB_z / AD_z
    ${task.lhs.x}/${task.rhs.x} = ${task.lhs.y}/${task.rhs.y} = ${task.lhs.z}/${
			task.rhs.z
		}
    ${result.value ? 'Векторы коллинеарны' : 'Векторы не коллинеарны'}`,
	});

	if (!solution[0].value) {
		describedSolution.push({
			description: 'Найдём координаты точки C',
			action: `C = {B_x + AD_x; B_y + AD_y; B_z + AD_z} = {${
				task.coordinates.b.x
			} + ${task.rhs.x}; ${task.coordinates.b.y} + ${task.rhs.y}; ${
				task.coordinates.b.z
			} + ${task.rhs.z}} = {${solution[1].value.join('; ')}}`,
		});

		describedSolution.push({
			description: 'Построим параллелограмм ABCD',
			action: `A(${solution[2].value[0].join(
				'; '
			)}), B(${solution[2].value[1].join('; ')}), C(${solution[2].value[2].join(
				'; '
			)}), D(${solution[2].value[3].join('; ')})`,
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
