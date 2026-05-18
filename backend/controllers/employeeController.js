const Employee = require('../models/Employee');

// @desc    Create new employee
// @route   POST /api/employees
// @access  Private
exports.addEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({
      success: true,
      data: employee
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Duplicate email' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error: Missing required fields' });
    }
    next(err);
  }
};

// @desc    Get all employees or search
// @route   GET /api/employees
// @route   GET /api/employees/search?department=Development
// @access  Private
exports.getEmployees = async (req, res, next) => {
  try {
    let query;
    if (req.query.department) {
       query = Employee.find({ department: { $regex: new RegExp(req.query.department, 'i') } });
    } else {
       query = Employee.find();
    }

    const employees = await query;
    res.status(200).json({
      success: true,
      data: employees
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private
exports.updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private
exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
