import React from 'react';

const App = () => {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		fetch('/api')
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

	return <div>{data}</div>;
};

export default App;
