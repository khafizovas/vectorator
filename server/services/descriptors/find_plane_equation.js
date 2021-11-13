const describePlaneEquation = ({ task, solution }) => {
	const describedSolution = [];

	if (solution[0].name === 'AA_1') {
		describedSolution.push({
			description: 'Найдём координаты вектора AA_1',
			action: `AA_1 = {A_1_x - A_x; A_1_y - A_y; A_1_z - A_z} = {
        ${task.a1.x} - ${task.a.x}; 
        ${task.a1.y} - ${task.a.y}; 
        ${task.a1.z} - ${task.a.z}
      } = {${solution[0].value.join('; ')}}`,
		});

		describedSolution.push({
			description: 'Найдём координаты B_1',
			action: `B_1 = {B_x + AA_1_x; B_y + AA_1_y; B_z + AA_1_z} = {
        ${task.b.x} + ${solution[0].value[0]}; 
        ${task.b.y} + ${solution[0].value[1]}; 
        ${task.b.z} + ${solution[0].value[2]}
      }`,
		});
	}

	describedSolution.push({
		description: 'Составим уравнение плоскости по трём точкам',
		action: `${Object.values(task)
			.map((point) => `{${Object.values(point).join('; ')}}`)
			.join(', ')}`,
	});

	describedSolution.push({
		description: 'Составим уравнение плоскости в матричной форме',
		action: `[
      [x - x_0, x_1 - x_0, x_2 - x_0], 
      [y - y_0, y_1 - y_0, y_2 - y_0], 
      [z - z_0, z_1 - z_0, z_2 - z_0]
    ] = 
      (x - x_0) * [[y_1 - y_0, y_2 - y_0], [z_1 - z_0, z_2 - z_0]] - 
      (y - y_0) * [[x_1 - x_0, x_2 - x_0], [z_1 - z_0, z_2 - z_0]] + 
      (z - z_0) * [[x_1 - x_0, x_2 - x_0], [y_1 - y_0, y_2 - y_0]] = 
      (x - ${task.a.x}) * 
        [${solution[solution.length - 4].value[0]
					.map((row) => `[${row.join('; ')}]`)
					.join(', ')}] - 
      (y - ${task.a.y}) * 
        [${solution[solution.length - 4].value[1]
					.map((row) => `[${row.join('; ')}]`)
					.join(', ')}] + 
      (z - ${task.a.z}) * 
        [${solution[solution.length - 4].value[2]
					.map((row) => `[${row.join('; ')}]`)
					.join(', ')}] = 0`,
	});

	describedSolution.push({
		description: 'Найдём определители матриц-сомножителей',
		action: `(x - x_0) * ((y_1 - y_0)(z_2 - z_0) - (z_1 - z_0)(y_2 - y_0)) -
      (y - y_0) * ((x_1 - x_0)(z_2 - z_0) - (z_1 - z_0)(x_2 - x_0)) +
      (z - z_0) * ((x_1 - x_0)(y_2 - y_0) - (y_1 - y_0)(x_2 - x_0)) = 
      ${solution[solution.length - 3].value[0]} * (x - ${task.a.x}) - 
      ${solution[solution.length - 3].value[1]} * (y - ${task.a.y}) + 
      ${solution[solution.length - 3].value[2]} * (z - ${task.a.z}) = 0`,
	});

	describedSolution.push({
		description: 'Упростим получившееся выражение',
		action: `${solution[solution.length - 2].value[0]}x + 
      ${solution[solution.length - 2].value[1]}y + 
      ${solution[solution.length - 2].value[2]}z + 
      ${solution[solution.length - 2].value[3]} = 0`,
	});

	if (
		JSON.stringify(solution[solution.length - 1]) !==
		JSON.stringify(solution[solution.length - 2])
	) {
		describedSolution.push({
			description: 'Разделим сомножители на их НОД',
			action: `${solution[solution.length - 1].value[0]}x + 
        ${solution[solution.length - 1].value[1]}y + 
        ${solution[solution.length - 1].value[2]}z + 
        ${solution[solution.length - 1].value[3]} = 0`,
		});
	}

	return { describedSolution };
};

module.exports = describePlaneEquation;
