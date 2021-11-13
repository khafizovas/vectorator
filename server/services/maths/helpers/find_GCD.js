/**
 * Найти наибольший общий делитель чисел.
 * @param {number[]} numbers
 * @returns {number}
 */
const findGCD = (numbers) => {
	const factor =
		10 **
		Math.max(
			...numbers.map((num) => num.toString().split('.')[1]?.length || 0)
		);

	return numbers.reduce(
		(gcd, cur) => findIntGCD(Math.abs(cur) * factor, gcd),
		Math.abs(numbers[0]) * factor
	);
};

/**
 * Найти наибольший общий делитель 2 целых чисел.
 * @param {number} lhs
 * @param {number} rhs
 * @returns {number}
 */
const findIntGCD = (lhs, rhs) => {
	return !rhs ? lhs : findIntGCD(rhs, lhs % rhs);
};

module.exports = findGCD;
