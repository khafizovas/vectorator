const describeParallelogramArea = ({ task, solution }) => {
	const describedSolution = [];

	describedSolution.push({
		description: 'Найдём векторное произведение векторов AB и AD',
		action: `[AB, AD] = |[
      [i, j, k],
		  [AB_x, AB_y, AB_z],
		  [AD_x, AD_y, AD_z]
    | = |
      [[AB_y, AB_z], [AD_y, AD_z]] * i - 
      [[AB_x, AB_z], [AD_x, AD_z]] * j + 
      [[AB_x, AB_y], [AD_x, AD_y]] * k
    | = (AB_y * AD_z - AD_y * AB_z) * i - 
      (AB_x * AD_z - AD_x * AB_z) * j + 
      (AB_x * AD_y - AD_x * AB_y) * k = 
    = (${task.lhs.y} * ${task.rhs.z} -  ${task.rhs.y} *  ${task.lhs.z}) * i - 
      (${task.lhs.x} * ${task.rhs.z} - ${task.rhs.x} * ${task.lhs.z}) * j + 
      (${task.lhs.x} * ${task.rhs.y} - ${task.rhs.x} * ${task.lhs.y}) * k = 
    = ${solution[0].value[0]} * i - ${solution[0].value[1]} * j + ${
			solution[0].value[2]
		} * k = 
    = {${solution[0].value.join('; ')}}`,
	});

	describedSolution.push({
		description: 'Найдём длину найденного вектора',
		action: `S = sqrt(${solution[0].value[0]}^2 + ${solution[0].value[1]}^2 + ${solution[0].value[2]}^2) = 
      = ${solution[1].value}`,
	});

	return describedSolution;
};

module.exports = describeParallelogramArea;
