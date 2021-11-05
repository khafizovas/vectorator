const describeRatioPoint3D = ({ task, solution }) => {
	const describedSolution = [];

	describedSolution.push({
		description: 'Найдём lambda',
		action: `lambda = a / b = ${task.ratioParts.a} / ${task.ratioParts.b} = ${solution[0].value}`,
	});

	describedSolution.push({
		description: 'Найдём координату x искомой точки M',
		action: `M_x = (A_x + lambda * B_x) / (1 + lambda) = (${task.vectorPoints.first.x} + ${solution[0].value} * ${task.vectorPoints.second.x}) / (1 + ${solution[0].value}) = ${solution[1].value}`,
	});

	describedSolution.push({
		description: 'Найдём координату y искомой точки M',
		action: `M_x = (A_y + lambda * B_y) / (1 + lambda) = (${task.vectorPoints.first.y} + ${solution[0].value} * ${task.vectorPoints.second.y}) / (1 + ${solution[0].value}) = ${solution[2].value}`,
	});

	describedSolution.push({
		description: 'Найдём координату z искомой точки M',
		action: `M_x = (A_z + lambda * B_z) / (1 + lambda) = (${task.vectorPoints.first.z} + ${solution[0].value} * ${task.vectorPoints.second.z}) / (1 + ${solution[0].value}) = ${solution[3].value}`,
	});

	describedSolution.push({
		description: 'Координаты искомой точки M',
		action: `M = (${Object.values(solution[4].value).join('; ')})`,
	});

	return { describedSolution: describedSolution };
};

module.exports = describeRatioPoint3D;
