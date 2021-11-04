const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const express = require('express');

const routes = require('./routes/tasks.routes');

const PORT = process.env.PORT || 3001;
const app = express();

dotenv.config();

app.use(express.json());
app.use(routes);
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
	mongoose.connect(process.env.DB_URI).then(() => {
		console.log(`Connected to mongoDB`);
	});
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
