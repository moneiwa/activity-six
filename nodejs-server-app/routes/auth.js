const express = require('express');
const router = express.Router();
const { AddEmployee, deleteEmployee } = require('./Controllers/db');

router.post('/addEmployee', AddEmployee);
router.delete('/employees/:id', deleteEmployee); 

module.exports = router;
