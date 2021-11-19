const addBrackets = require('./add_brackets');
const describePlaneEquation = require('./find_plane_equation');

const describeSymmetricalPoint = ({ task, solution, result }) => {
	const describedSolution = describePlaneEquation({
		task,
		solution: solution.slice(1, -10),
		result,
	}).describedSolution;

	describedSolution.push({
		description: 'Таким образом, вектор нормали к плоскости',
		action: `$\\overrightarrow{n} = \\left\\{${solution[
			solution.length - 10
		].value.join('; ')}\\right\\}$`,
	});

	describedSolution.push({
		description: 'Найдём t',
		action: `$t = -\\dfrac{A_{1x} \\times A + A_{1y} \\times B + A_{1z} \\times C + D}{A^2 + B^2 + C^2} = -\\dfrac{${
			task.a1.x
		} \\times ${addBrackets(
			solution[solution.length - 11].value[0]
		)} + ${addBrackets(task.a1.y)} \\times ${addBrackets(
			solution[solution.length - 11].value[1]
		)} + ${addBrackets(task.a1.z)} \\times ${addBrackets(
			solution[solution.length - 11].value[2]
		)} + ${addBrackets(solution[solution.length - 11].value[3])}}{${addBrackets(
			solution[solution.length - 11].value[0]
		)}^2 + ${addBrackets(
			solution[solution.length - 11].value[1]
		)}^2 + ${addBrackets(solution[solution.length - 11].value[2])}^2} = ${
			solution[solution.length - 9].value
		}$`,
	});

	describedSolution.push({
		description:
			'Найдём координату x точки пересечения плоскости и нормали к ней, проходящей через данную точку',
		action: `$A_{0x} = t \\times A + A_{1x} = ${addBrackets(
			solution[solution.length - 9].value
		)} \\times ${addBrackets(
			solution[solution.length - 10].value[0]
		)} + ${addBrackets(task.a1.x)} = ${solution[solution.length - 8].value}$`,
	});

	describedSolution.push({
		description:
			'Найдём координату y точки пересечения плоскости и нормали к ней, проходящей через данную точку',
		action: `$A_{0y} = t \\times B + A_{1y} = ${addBrackets(
			solution[solution.length - 9].value
		)} \\times ${addBrackets(
			solution[solution.length - 10].value[1]
		)} + ${addBrackets(task.a1.y)} = ${solution[solution.length - 7].value}$`,
	});

	describedSolution.push({
		description:
			'Найдём координату z точки пересечения плоскости и нормали к ней, проходящей через данную точку',
		action: `$A_{0z} = t \\times C + A_{1z} = ${addBrackets(
			solution[solution.length - 9].value
		)} \\times ${addBrackets(
			solution[solution.length - 10].value[2]
		)} +  ${addBrackets(task.a1.z)} = ${solution[solution.length - 6].value}$`,
	});

	describedSolution.push({
		description: 'Таким образом, координаты данной точки пересечения',
		action: `$A_{0} = \\left\\{${solution[solution.length - 5].value.join(
			'; '
		)}\\right\\}$`,
	});

	describedSolution.push({
		description:
			'Найдём координаты вектора нормали к плоскости, проходящей через данную точку',
		action: `$\\overrightarrow{A_{1}A_{0}} = \\left\\{A_{0x} - A_{1x}; A_{0y} - A_{1y}; A_{0z} - A_{1z}\\right\\} = \\left\\{${
			solution[solution.length - 8].value
		} - ${addBrackets(task.a1.x)}; ${
			solution[solution.length - 7].value
		} - ${addBrackets(task.a1.y)}; ${
			solution[solution.length - 6].value
		} - ${addBrackets(task.a1.z)}\\right\\} = \\left\\{${solution[
			solution.length - 3
		].value.join('; ')}\\right\\}$`,
	});

	describedSolution.push({
		description: 'Найдём координаты искомой точки',
		action: `$A_{2} = \\left\\{A_{1x} + \\overrightarrow{A_{1}A_{0}}_{x}; A_{1y} + \\overrightarrow{A_{1}A_{0}}_{y}; A_{1z} + \\overrightarrow{A_{1}A_{0}}_{z}\\right\\} = \\left\\{${
			task.a1.x
		} + ${addBrackets(solution[solution.length - 3].value[0])}; ${
			task.a1.y
		} + ${addBrackets(solution[solution.length - 3].value[1])}; ${
			task.a1.z
		} + ${addBrackets(
			solution[solution.length - 3].value[2]
		)}\\right\\} = \\left\\{${solution[solution.length - 1].value.join(
			'; '
		)}\\right\\}$`,
	});

	return { describedSolution };
};

module.exports = describeSymmetricalPoint;
