const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');

// Get all instructors
router.get('/', instructorController.getAllInstructors);

// Add a new instructor
router.post('/', instructorController.addInstructor);

// Update an instructor
router.put('/:id', instructorController.updateInstructor);

// Delete an instructor
router.delete('/:id', instructorController.deleteInstructor);

module.exports = router;
