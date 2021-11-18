const findPointRadius = (coordinates) => {
	return Math.sqrt(
		coordinates.reduce(
			(sum, coordinate) => sum + (Math.sqrt(2) * coordinate) ** 2,
			0
		)
	);
};

const findUnit = (size, figures) =>
	(0.5 * size) /
	Math.max(
		...figures
			.map((step) => {
				if (Array.isArray(step.value)) {
					if (Array.isArray(step.value[0])) {
						if (Array.isArray(step.value[0][0])) {
							// Parallelepiped
							return step.value.map((points) =>
								points.map((point) => findPointRadius(point))
							);
						} else {
							// Parallelogram, plane, vector
							return step.value.map((point) => findPointRadius(point));
						}
					} else {
						// Point
						return findPointRadius(step.value);
					}
				} else {
					// Coordinate
					return Math.sqrt(2) * Math.abs(step.value);
				}
			})
			.flat(Infinity)
	);

module.exports = findUnit;
