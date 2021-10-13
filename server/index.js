const path = require('path');
const express = require('express');

const routes = require('./routes/task.routes');

const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3001;
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
