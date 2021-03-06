const describeParallelogramDiagonalesAngles = ({ task, solution }) => {
	const describedSolution = [];

	describedSolution.push({
		description: 'Найдём координаты вектора BD',
		action: `BD = {D_x - B_x; D_y - B_y; D_z - B_z} = 
      {${task.d.x} - ${task.b.x}; 
      ${task.d.y} - ${task.b.y}; 
      ${task.d.z} - ${task.b.z}} = 
      {${solution[1].value.join('; ')}}`,
	});

	describedSolution.push({
		description: 'Найдём координаты вектора AC',
		action: `AC = AB + AD = 
      {AB_x + AD_x; AB_y + AD_y; AB_z + AD_z} = 
      {${solution[2].value[0]} + ${solution[3].value[0]}; 
        ${solution[2].value[1]} + ${solution[3].value[1]}; 
        ${solution[2].value[2]} + ${solution[3].value[2]}} = 
      {${solution[5].value.join('; ')}}`,
	});

	describedSolution.push({
		description: 'Найдём косинус острого угла между ними',
		action: `cos(alpha) = |AC * BD| / (|AC| * |BD|) = 
      |AC_x * BD_x + AC_y * BD_y + AC_z * BD_z| / (sqrt(AC_x^2 + AC_y^2 + AC_z^2) * sqrt(BD_x^2 + BD_y^2 + BD_z^2)) = 
      |${solution[5].value[0]} * ${solution[1].value[0]} + 
        ${solution[5].value[1]} * ${solution[1].value[1]} + 
        ${solution[5].value[2]} * ${solution[1].value[2]}| / 
      sqrt(${solution[5].value[0]}^2 + 
        ${solution[5].value[1]}^2 + 
        ${solution[5].value[2]}^2) = 
      ${solution[6].value}`,
	});

	describedSolution.push({
		description: 'Найдём арккосинус',
		action: `alpha = acos(${solution[6].value}) = ${solution[7].value}`,
	});

	describedSolution.push({
		description: 'Переведём радианы в градусы',
		action: `alpha = ${solution[7].value} * 180 / pi = 
      ${solution[8].value}`,
	});

	describedSolution.push({
		description: 'Найдём второй угол',
		action: `beta = 180 - alpha = 180 - ${solution[8].value} = ${solution[9].value}`,
	});

	return { describedSolution: describedSolution };
};

module.exports = describeParallelogramDiagonalesAngles;
