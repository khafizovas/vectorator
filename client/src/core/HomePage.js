import React, { useState, useEffect } from 'react';

const HomePage = () => {
	const [test, setTest] = useState(null);

	useEffect(
		() =>
			fetch('/api/task/ratio_point_coordinates', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					pointsPair: {
						first: { x: 0, y: 0, z: 0 },
						second: { x: 3, y: 0, z: 0 },
					},
					ratioParts: { a: 1, b: 2 },
				}),
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					setTest(data.result);
				}),
		[]
	);

	return (
		<div className='content'>
			HomePage component: {`${test?.x}, ${test?.y}, ${test?.z}`}
		</div>
	);
};

export default HomePage;
