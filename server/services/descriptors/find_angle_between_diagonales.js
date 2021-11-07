const describeParallelogramDiagonalesAngles = ({ task, solution, result }) => {
	const describedSolution = [];

	describedSolution.push({
		description: 'Построим вектор BD',
		action: `BD = {D_x - B_x; D_y - B_y; D_z - B_z} = 
      {${task.d.x} - ${task.b.x}; 
      ${task.d.y} - ${task.b.y}; 
      ${task.d.z} - ${task.b.z}} = 
      {${solution[0].value.join('; ')}}`,
	});

	describedSolution.push({
		description: 'Построим вектор AC',
		action: `AC = AB + AD = 
      {AB_x + AD_x; AB_y + AD_y; AB_z + AD_z} = 
      {${task.b.x - task.a.x} + ${task.d.x - task.a.x}; 
        ${task.b.y - task.a.y} + ${task.d.y - task.a.y}; 
        ${task.b.z - task.a.z} + ${task.d.z - task.a.z}} = 
      {${solution[1].value.join('; ')}}`,
	});

	describedSolution.push({
		description: 'Найдём косинус острого угла между ними',
		action: `cos(alpha) = |AC * BD| / (|AC| * |BD|) = 
      |AC_x * BD_x + AC_y * BD_y + AC_z * BD_z| / (sqrt(AC_x^2 + AC_y^2 + AC_z^2) * sqrt(BD_x^2 + BD_y^2 + BD_z^2)) = 
      |${solution[1].value[0]} * ${solution[0].value[0]} + 
        ${solution[1].value[1]} * ${solution[0].value[1]} + 
        ${solution[1].value[2]} * ${solution[0].value[2]}| / 
      sqrt(${solution[1].value[0]}^2 + 
        ${solution[1].value[1]}^2 + 
        ${solution[1].value[2]}^2) = 
      ${solution[2].value}`,
	});

	describedSolution.push({
		description: 'Найдём арккосинус',
		action: `alpha = acos(${solution[2].value}) = ${solution[3].value}`,
	});

	describedSolution.push({
		description: 'Переведём радианы в градусы',
		action: `alpha = ${solution[3].value} * 180 / pi = 
      ${solution[4].value}`,
	});

	describedSolution.push({
		description: 'Найдём второй угол',
		action: `beta = 180 - alpha = 180 - ${solution[4].value} = ${solution[5].value}`,
	});

	return describedSolution;
};

module.exports = describeParallelogramDiagonalesAngles;
