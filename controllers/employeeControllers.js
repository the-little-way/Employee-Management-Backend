const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee');

//localhost:port/employees = '/'
router.get('/', (req, res) => {
	// search db
	Employee.find((err, docs)=>{
		if(!err){
			res.send(docs)
		}
		else {
			console.log('Oops. Error retriving from database:' + JSON.stringify(err, undefined, 2) )
		}
	}
	);
});

// using params in url to view only specific elements in the db
router.get('/:id', (req, res) => {
	// check for id validity
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('Hmm.. something went wrong');
	Employee.findById(req.params.id, (err, doc) => {
		if (!err) { res.send(doc) }
		else { console.log('Oops. Error searching for employee:' + JSON.stringify(err)) }
	});
	
});

router.post('/', (req, res) => {
	// using model, create data object from html input for the db
	var emp = new Employee({
		//using body-parser to isolate various incoming form fields and storing them as key value pairs in this object 'emp'
		name: req.body.name,
		position: req.body.position,
		office: req.body.office,
		salary: req.body.salary
	})
	//.save object into db
	emp.save( (err, doc)={
		if(!err) {
			req.save(doc)
		}
		else {
			res.send('Oops. Error saving to database:' + JSON.stringify(err) )
		}
	}
	)
});

// route for updating dp records
router.put('/:id', (req, res)=>{
	// check for id validity
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('Hmm.. something went wrong');
	
	//parse for data to use in the update
	var emp = {
		name: req.body.name,
		position: req.body.position,
		office: req.body.office,
		salary: req.body.salary	
	}
	
	//new:true to return the updated value in doc
	Employee.findByIdAndUpdate(req.params.id, { $set : emp}, { new : true}, (err, doc)=>{
	if (!err) { res.send(doc) }
	else { console.log('Oops. Error updating employee data:' + JSON.stringify(err)) }
	})
	
})

// route for deleting records
router.delete('/:id', (req, res)=>{
	// check for id validity
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('Hmm.. something went wrong');
	
	Employee.findByIdAndRemove(req.params.id, (err, doc)=>{
	if (!err) { res.send(doc) }
	else { console.log('Oops. Error deleting employee data:' + JSON.stringify(err)) }
	})


module.exports = router;
