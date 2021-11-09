const describeParallelepiped = ({ task, solution }) => {
	const describedSolution = [];

	describedSolution.push({
		description: 'Запишем данные векторы в виде матрицы',
		action: `[[AB_x, AB_y, AB_z], [AD_x, AD_y, AD_z], [AA1_x, AA1_y, AA1_z]] = 
      [${solution[0].value.map((row) => `[${row.join('; ')}]`).join(', ')}]`,
	});

	describedSolution.push({
		description: 'Найдём определитель матрицы',
		action: `V = |[[AB_x, AB_y, AB_z], [AD_x, AD_y, AD_z], [AA1_x, AA1_y, AA1_z]]| = 
      AB_x * |[[AD_y, AD_z], [AA1_y, AA1_z]]| - 
      AB_y * |[[AD_x, AD_z], [AA1_x, AA1_z]]| + 
      AB_z * |[[AD_x, AD_y], [AA1_x, AA1_y]]| = 
      AB_x * (AD_y * AA1_z - AA1_y * AD_z) - 
      AB_y * (AD_x * AA1_z - AA1_x * AD_z) + 
      AB_z * (AD_x * AA1_y - AA1_x * AD_y) = 
      ${task.AB.x} * (
        ${task.AD.y} * ${task.AA1.z} - 
        ${task.AA1.y} * ${task.AD.z}) -
      ${task.AB.y} * (
        ${task.AD.x} * ${task.AA1.z} - 
        ${task.AA1.x} * ${task.AD.z}) + 
      ${task.AB.z} * (
        ${task.AD.x} * ${task.AA1.y} - 
        ${task.AA1.x} * ${task.AD.y}) = 
      ${solution[1].value} 
      ${
				solution[1].value
					? `!= 0 => можно построить параллелепипед объёма ${solution[1].value}.`
					: '== 0 => нельзя'
			}`,
	});

	return describedSolution;
};

module.exports = describeParallelepiped;
