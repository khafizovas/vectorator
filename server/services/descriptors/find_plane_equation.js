const addBrackets = require('./add_brackets');

const describePlaneEquation = ({ task, solution }) => {
	const describedSolution = [];

	if (solution[0].name === 'AA_1') {
		describedSolution.push({
			description: 'Найдём координаты вектора AA₁',
			action: `$\\vec{AA}_1 = \\left\\{A_{1x} - A_{x}; A_{1y} - A_{y}; A_{1z} - A_{z}\\right\\} = \\left\\{${
				task.a1.x
			} - ${addBrackets(task.a.x)}; ${task.a1.y} - ${addBrackets(task.a.y)}; ${
				task.a1.z
			} - ${addBrackets(
				task.a.z
			)}\\right\\} = \\left\\{${solution[0].value.join('; ')}\\right\\}$`,
		});

		describedSolution.push({
			description: 'Найдём координаты B₁',
			action: `$B_{1} = \\left\\{B_{x} + \\overrightarrow{AA_{1}}_{x}; B_{y} + \\overrightarrow{AA_{1}}_{y}; B_{z} + \\overrightarrow{AA_{1}}_{z}\\right\\} = \\left\\{${
				task.b.x
			} + ${addBrackets(solution[0].value[0])}; ${task.b.y} + ${addBrackets(
				solution[0].value[1]
			)}; ${task.b.z} + ${addBrackets(
				solution[0].value[2]
			)}\\right\\} = \\left\\{${solution[1].value.join('; ')}\\right\\}$`,
		});
	}

	describedSolution.push({
		description: 'Составим уравнение плоскости по трём точкам',
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
		action: `$\\begin{vmatrix}x - x_{0} & x_{1} - x_{0} & x_{2} - x_{0} \\\\y - y_{0} & y_{1} - y_{0} & y_{2} - y_{0} \\\\z - z_{0} & z_{1} - z_{0} & z_{2} - z_{0}\\end{vmatrix} = 
		\\left(x - ${addBrackets(task.a.x)}\\right)\\begin{vmatrix}${solution[
			solution.length - 4
		].value[0]
			.map((row) => `${row.join(' & ')}`)
			.join(' \\\\')} \\end{vmatrix} - \\left(y - ${addBrackets(
			task.a.y
		)}\\right)\\begin{vmatrix}${solution[solution.length - 4].value[1]
			.map((row) => `${row.join(' & ')}`)
			.join(' \\\\')}\\end{vmatrix} + \\left(z - ${addBrackets(
			task.a.z
		)}\\right)\\begin{vmatrix}${solution[solution.length - 4].value[2]
			.map((row) => `${row.join(' & ')}`)
			.join(' \\\\')}\\end{vmatrix} = 0$`,
	});

	describedSolution.push({
		description: 'Найдём определители матриц-сомножителей',
		action: `$\\left(x - ${addBrackets(
			task.a.x
		)}\\right)\\begin{vmatrix}${solution[solution.length - 4].value[0]
			.map((row) => `${row.join(' & ')}`)
			.join(' \\\\')} \\end{vmatrix} - \\left(y - ${addBrackets(
			task.a.y
		)}\\right)\\begin{vmatrix}${solution[solution.length - 4].value[1]
			.map((row) => `${row.join(' & ')}`)
			.join(' \\\\')}\\end{vmatrix} + \\left(z - ${addBrackets(
			task.a.z
		)}\\right)\\begin{vmatrix}${solution[solution.length - 4].value[2]
			.map((row) => `${row.join(' & ')}`)
			.join(' \\\\')}\\end{vmatrix} =
		${solution[solution.length - 3].value[0]}\\left(x - ${addBrackets(
			task.a.x
		)}\\right) - ${
			solution[solution.length - 3].value[1]
		}\\left(y - ${addBrackets(task.a.y)}\\right) + ${addBrackets(
			solution[solution.length - 3].value[2]
		)}\\left(z - ${addBrackets(task.a.z)}\\right) = 0$`,
	});

	describedSolution.push({
		description: 'Упростим получившееся выражение',
		action: `$${solution[solution.length - 2].value[0]}x + 
      ${addBrackets(solution[solution.length - 2].value[1])}y + 
      ${addBrackets(solution[solution.length - 2].value[2])}z + 
      ${addBrackets(solution[solution.length - 2].value[3])} = 0$`,
	});

	if (
		JSON.stringify(solution[solution.length - 1]) !==
		JSON.stringify(solution[solution.length - 2])
	) {
		describedSolution.push({
			description: 'Разделим сомножители на их НОД',
			action: `$${solution[solution.length - 1].value[0].toPrecision(4)}x + 
        ${addBrackets(solution[solution.length - 1].value[1])}y + 
        ${addBrackets(solution[solution.length - 1].value[2])}z + 
        ${addBrackets(solution[solution.length - 1].value[3])} = 0$`,
		});
	}

	return { describedSolution };
};

module.exports = describePlaneEquation;
