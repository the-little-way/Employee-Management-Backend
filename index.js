const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db.js');
const employeeControllers = require('./controllers/employeeControllers.js');

var app = express();
app.use(bodyParser.json());

const port = 3000;

app.listen(port, ()=> {
	console.log('Server is now running on port:' + port)
}

//append employees to base url '/'
app.use('/emplyees', employeeControllers);