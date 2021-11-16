const describePlaneEquation = ({ task, solution }) => {
	const describedSolution = [];

	if (solution[0].name === 'AA_1') {
		describedSolution.push({
			description: 'Найдём координаты вектора AA₁',
			// action: `AA_1 = {A_1_x - A_x; A_1_y - A_y; A_1_z - A_z} = {
			//   ${task.a1.x} - ${task.a.x};
			//   ${task.a1.y} - ${task.a.y};
			//   ${task.a1.z} - ${task.a.z}
			// } = {${solution[0].value.join('; ')}}`,
			action: `$\\vec{AA}_1 = \\left\\{A_{1x} - A_{x}; A_{1y} - A_{y}; A_{1z} - A_{z}\\right\\} = \\left\\{${
				task.a1.x
			} - ${task.a.x}; ${task.a1.y} - ${task.a.y}; ${task.a1.z} - ${
				task.a.z
			}\\right\\} = \\left\\{${solution[0].value.join('; ')}\\right\\}$`,
		});

		describedSolution.push({
			description: 'Найдём координаты B₁',
			// action: `B_1 = {B_x + AA_1_x; B_y + AA_1_y; B_z + AA_1_z} = {
			//   ${task.b.x} + ${solution[0].value[0]};
			//   ${task.b.y} + ${solution[0].value[1]};
			//   ${task.b.z} + ${solution[0].value[2]}
			// }`,
			action: `$B_{1} = \\left\\{B_{x} + \\overrightarrow{AA_{1}}_{x}; B_{y} + \\overrightarrow{AA_{1}}_{y}; B_{z} + \\overrightarrow{AA_{1}}_{z}\\right\\} = \\left\\{${
				task.b.x
			} + ${solution[0].value[0]}; ${task.b.y} + ${solution[0].value[1]}; ${
				task.b.z
			} + ${solution[0].value[2]}\\right\\} = \\left\\{${solution[1].value.join(
				'; '
			)}\\right\\}$`,
		});
	}

	describedSolution.push({
		description: 'Составим уравнение плоскости по трём точкам',
		// action: `$${Object.values(task)
		// 	.map((point) => `\\left\\{${Object.values(point).join('; ')}\\right\\}`)
		// 	.join(', ')}$`,
		action: `$
		\\left\\{${Object.values(task.a).join('; ')}\\right\\}, \\left\\{${
			task.b1
				? Object.values(task.b1).join('; ')
				: Object.values(task.b).join('; ')
		}\\right\\}, \\left\\{${
			task.a1
				? Object.values(task.a1).join('; ')
				: Object.values(task.d).join('; ')
		}\\right\\}
		$`,
	});

	describedSolution.push({
		description: 'Составим уравнение плоскости в матричной форме',
		// action: `[
		//   [x - x_0, x_1 - x_0, x_2 - x_0],
		//   [y - y_0, y_1 - y_0, y_2 - y_0],
		//   [z - z_0, z_1 - z_0, z_2 - z_0]
		// ] =
		//   (x - x_0) * [[y_1 - y_0, y_2 - y_0], [z_1 - z_0, z_2 - z_0]] -
		//   (y - y_0) * [[x_1 - x_0, x_2 - x_0], [z_1 - z_0, z_2 - z_0]] +
		//   (z - z_0) * [[x_1 - x_0, x_2 - x_0], [y_1 - y_0, y_2 - y_0]] =
		//   (x - ${task.a.x}) *
		//     [${solution[solution.length - 4].value[0]
		// 			.map((row) => `[${row.join('; ')}]`)
		// 			.join(', ')}] -
		//   (y - ${task.a.y}) *
		//     [${solution[solution.length - 4].value[1]
		// 			.map((row) => `[${row.join('; ')}]`)
		// 			.join(', ')}] +
		//   (z - ${task.a.z}) *
		//     [${solution[solution.length - 4].value[2]
		// 			.map((row) => `[${row.join('; ')}]`)
		// 			.join(', ')}] = 0`,
		action: `$\\begin{vmatrix}x - x_{0} & x_{1} - x_{0} & x_{2} - x_{0} \\\\y - y_{0} & y_{1} - y_{0} & y_{2} - y_{0} \\\\z - z_{0} & z_{1} - z_{0} & z_{2} - z_{0}\\end{vmatrix} = 
		\\left(x - ${task.a.x}\\right)\\begin{vmatrix}${solution[
			solution.length - 4
		].value[0]
			.map((row) => `${row.join(' & ')}`)
			.join(' \\\\')} \\end{vmatrix} - \\left(y - ${
			task.a.y
		}\\right)\\begin{vmatrix}${solution[solution.length - 4].value[1]
			.map((row) => `${row.join(' & ')}`)
			.join(' \\\\')}\\end{vmatrix} + \\left(z - ${
			task.a.z
		}\\right)\\begin{vmatrix}${solution[solution.length - 4].value[2]
			.map((row) => `${row.join(' & ')}`)
			.join(' \\\\')}\\end{vmatrix} = 0$`,
	});

	describedSolution.push({
		description: 'Найдём определители матриц-сомножителей',
		// action: `(x - x_0) * ((y_1 - y_0)(z_2 - z_0) - (z_1 - z_0)(y_2 - y_0)) -
		//   (y - y_0) * ((x_1 - x_0)(z_2 - z_0) - (z_1 - z_0)(x_2 - x_0)) +
		//   (z - z_0) * ((x_1 - x_0)(y_2 - y_0) - (y_1 - y_0)(x_2 - x_0)) =
		//   ${solution[solution.length - 3].value[0]} * (x - ${task.a.x}) -
		//   ${solution[solution.length - 3].value[1]} * (y - ${task.a.y}) +
		//   ${solution[solution.length - 3].value[2]} * (z - ${task.a.z}) = 0`,
		action: `$\\left(x - ${task.a.x}\\right)\\begin{vmatrix}${solution[
			solution.length - 4
		].value[0]
			.map((row) => `${row.join(' & ')}`)
			.join(' \\\\')} \\end{vmatrix} - \\left(y - ${
			task.a.y
		}\\right)\\begin{vmatrix}${solution[solution.length - 4].value[1]
			.map((row) => `${row.join(' & ')}`)
			.join(' \\\\')}\\end{vmatrix} + \\left(z - ${
			task.a.z
		}\\right)\\begin{vmatrix}${solution[solution.length - 4].value[2]
			.map((row) => `${row.join(' & ')}`)
			.join(' \\\\')}\\end{vmatrix} =
		${solution[solution.length - 3].value[0]}\\left(x - ${task.a.x}\\right) - ${
			solution[solution.length - 3].value[1]
		}\\left(y - ${task.a.y}\\right) + ${
			solution[solution.length - 3].value[2]
		}\\left(z - ${task.a.z}\\right) = 0$`,
	});

	describedSolution.push({
		description: 'Упростим получившееся выражение',
		action: `$${solution[solution.length - 2].value[0]}x + 
      ${solution[solution.length - 2].value[1]}y + 
      ${solution[solution.length - 2].value[2]}z + 
      ${solution[solution.length - 2].value[3]} = 0$`,
	});

	if (
		JSON.stringify(solution[solution.length - 1]) !==
		JSON.stringify(solution[solution.length - 2])
	) {
		describedSolution.push({
			description: 'Разделим сомножители на их НОД',
			action: `$${solution[solution.length - 1].value[0]}x + 
        ${solution[solution.length - 1].value[1]}y + 
        ${solution[solution.length - 1].value[2]}z + 
        ${solution[solution.length - 1].value[3]} = 0$`,
		});
	}

	return { describedSolution };
};

module.exports = describePlaneEquation;
