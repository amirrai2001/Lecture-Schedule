const express = require('express');
const router = express.Router();
const courseController= require('../controllers/courseController');

// Get all courses
router.get('/', courseController.getAllCourses);

// Add a new course
router.post('/', courseController.addCourse);

// Update a course
router.put('/:id', courseController.updateCourse);

// Delete a course
router.delete('/:id', courseController.deleteCourse);

router.post('/:id/batches', courseController.addBatchToCourse);

router.delete("/:courseId/batches/:batchId", courseController.deleteBatch)
module.exports = router;


