const describePlaneEquation = require('./find_plane_equation');

const describeAngleBetweenPlanes = ({ task, solution, result }) => {
	const describedSolution = [
		...describePlaneEquation({ task, solution: solution.slice(0, 6), result })
			.describedSolution,
		...describePlaneEquation({ task, solution: solution.slice(6, 10), result })
			.describedSolution,
	];

	describedSolution.push({
		description: 'Найдём косинус угла между нормалями плоскостей',
		action: `cos(alpha) = |n_1 * n_2| / (|n_1| * |n_2|) = 
      |n_1_x * n_2_x + n_1_y * n_2_y + n_1_z * n_2_z| / 
      (sqrt(n_1_x^2 + n_1_y^2 + n_1_z^2) * sqrt(n_2_x^2 + n_2_y^2 + n_2_z^2)) = 
      ${solution[solution.length - 3].value}`,
	});

	describedSolution.push({
		description: 'Найдём арккосинус',
		action: `alpha = arccos(${solution[solution.length - 3].value}) = ${
			solution[solution.length - 2].value
		}`,
	});

	describedSolution.push({
		description: 'Переведём радианы в градусы',
		action: `alpha = ${solution[solution.length - 2].value} * 180 / pi = ${
			solution[solution.length - 1].value
		}`,
	});

	return { describedSolution };
};

module.exports = describeAngleBetweenPlanes;
