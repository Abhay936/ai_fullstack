const express = require('express');
const { addEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, addEmployee)
  .get(protect, getEmployees);

router.route('/search')
  .get(protect, getEmployees);

router.route('/:id')
  .put(protect, updateEmployee)
  .delete(protect, deleteEmployee);

module.exports = router;
