const describeVectorDecomposition = ({ task, solution, result }) => {
	const describedSolution = [];

	describedSolution.push({
		description: 'Составим систему уравнений в матричном виде',
		action: `[[AB_x, AD_x, AA1_x], [AB_y, AD_y, AA1_y], [AB_z, AD_z, AA1_z]] * [[x], [y], [z]] = 
				[[AH_x], [AH_y], [AH_z]]; 
      [${solution[0].value
				.map((row) => `[${row.join('; ')}]`)
				.join(', ')}] * [[x], [y], [z]] = 
					[[AH_x], [AH_y], [AH_z]]`,
	});

	describedSolution.push({
		description:
			'Найдём определитель первого сомножителя левой части уравнения',
		action: `delta = |[[AB_x, AB_y, AB_z], [AD_x, AD_y, AD_z], [AA1_x, AA1_y, AA1_z]]| = 
      AB_x * |[[AD_y, AD_z], [AA1_y, AA1_z]]| - 
      AB_y * |[[AD_x, AD_z], [AA1_x, AA1_z]]| + 
      AB_z * |[[AD_x, AD_y], [AA1_x, AA1_y]]| = 
      AB_x * (AD_y * AA1_z - AA1_y * AD_z) - 
      AB_y * (AD_x * AA1_z - AA1_x * AD_z) + 
      AB_z * (AD_x * AA1_y - AA1_x * AD_y) = 
      ${task.basis[0].x} * (
        ${task.basis[1].y} * ${task.basis[2].z} - 
        ${task.basis[2].y} * ${task.basis[1].z}) -
      ${task.basis[0].y} * (
        ${task.basis[1].x} * ${task.basis[2].z} - 
        ${task.basis[2].x} * ${task.basis[1].z}) + 
      ${task.basis[0].z} * (
        ${task.basis[1].x} * ${task.basis[2].y} - 
        ${task.basis[2].x} * ${task.basis[1].y}) = 
      ${solution[1].value}`,
	});

	describedSolution.push({
		description: 'Найдём определители следующих матриц',
		action: `[${solution[2].value
			.map((row) => `[${row.join('; ')}]`)
			.join(', ')}]`,
	});

	describedSolution.push({
		description: 'Найдём delta_1',
		action: `delta_1 = |[[AH_x, AB_y, AB_z], [AH_y, AD_y, AD_z], [AH_z, AA1_y, AA1_z]]| = 
      AH_x * |[[AD_y, AD_z], [AA1_y, AA1_z]]| - 
      AB_y * |[[AH_y, AD_z], [AH_z, AA1_z]]| + 
      AB_z * |[[AH_y, AD_y], [AH_z, AA1_y]]| = 
      AH_x * (AD_y * AA1_z - AA1_y * AD_z) - 
      AB_y * (AH_y * AA1_z - AH_z * AD_z) + 
      AB_z * (AH_y * AA1_y - AH_z * AD_y) = 
      ${task.vector.x} * (
        ${task.basis[1].y} * ${task.basis[2].z} - 
        ${task.basis[2].y} * ${task.basis[1].z}
			) -
      ${task.basis[0].y} * (
        ${task.vector.y} * ${task.basis[2].z} - 
        ${task.vector.z} * ${task.basis[1].z}
			) + 
      ${task.basis[0].y} * (
        ${task.vector.y} * ${task.basis[2].y} - 
        ${task.vector.z} * ${task.basis[1].y}
			) = ${solution[3].value}`,
	});

	describedSolution.push({
		description: 'Найдём delta_2',
		action: `delta_2 = |[[AB_x, AH_x, AB_z], [AD_x, AH_y, AD_z], [AA1_x, AH_z, AA1_z]]| = 
      AB_x * |[[AH_y, AD_z], [AH_z, AA1_z]]| - 
      AH_x * |[[AD_x, AD_z], [AA1_x, AA1_z]]| + 
      AB_z * |[[AD_x, AH_y], [AA1_x, AH_z]]| = 
      AB_x * (AH_y * AA1_z - AH_z * AD_z) - 
      AH_x * (AD_x * AA1_z - AA1_x * AD_z) + 
      AB_z * (AD_x * AH_z - AA1_x * AH_y) = 
      ${task.basis[0].x} * (
				${task.vector.y} * ${task.basis[2].z} - 
				${task.vector.z} * ${task.basis[1].z}
			) - 
			${task.vector.x} * (
				${task.basis[1].x} * ${task.basis[2].z} - 
				${task.basis[2].x} * ${task.basis[1].z}
			) + 
			${task.basis[0].z} * (
				${task.basis[1].x} * ${task.vector.z} - 
				${task.basis[2].x} * ${task.vector.y}
			) = ${solution[4].value}`,
	});

	describedSolution.push({
		description: 'Найдём delta_3',
		action: `delta_3 = |[[AB_x, AB_y, AH_x], [AD_x, AD_y, AH_y], [AA1_x, AA1_y, AH_z]]| = 
      AB_x * |[[AD_y, AH_y], [AA1_y, AH_z]]| - 
      AB_y * |[[AD_x, AH_y], [AA1_x, AH_z]]| + 
      AH_x * |[[AD_x, AD_y], [AA1_x, AA1_y]]| = 
      AB_x * (AD_y * AH_z - AA1_y * AH_y) - 
      AB_y * (AD_x * AH_z - AA1_x * AH_y) + 
      AH_x * (AD_x * AA1_y - AA1_x * AD_y) = 
      ${task.basis[0].x} * (
				${task.basis[1].y} * ${task.vector.z} - 
				${task.basis[2].y} * ${task.vector.y}
			) - 
			${task.basis[0].y} * (
				${task.basis[1].x} * ${task.vector.z} - 
				${task.basis[2].x} * ${task.vector.y}
			) + 
			${task.vector.x} * (
				${task.basis[1].x} * ${task.basis[2].y} - 
				${task.basis[2].x} * ${task.basis[1].y}
			)
			) = ${solution[5].value}`,
	});

	describedSolution.push({
		description: 'Найдём координаты искомого разложения',
		action: `{delta_1 / delta; delta_2 / delta; delta_3 / delta} = {
			${solution[3].value} / ${solution[1].value}; 
			${solution[4].value} / ${solution[1].value}; 
			${solution[5].value} / ${solution[1].value}
		} = {${result.value.join('; ')}}`,
	});

	return { describedSolution };
};

module.exports = describeVectorDecomposition;
