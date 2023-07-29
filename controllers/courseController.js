const Course = require('../models/courses');

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching courses' });
  }
};

// Add a new course
exports.addCourse = async (req, res) => {
  const { name, level, description } = req.body;

  try {
    const newCourse = new Course({ name, level, description });
    await newCourse.save();
    res.json(newCourse);
  } catch (error) {
    res.status(500).json({ error: 'Error adding course' });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  const { name, level, description, batches } = req.body;
  const { id } = req.params;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { name, level, description, batches },
      { new: true }
    );
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: 'Error updating course' });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    await Course.findByIdAndDelete(id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting course' });
  }
};

exports.addBatchToCourse = async (req, res) => {
  const courseId = req.params.id;
  console.log(courseId)
  const { name, instructorName } = req.body;
  console.log(req.body)

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    const existingBatch = course.batches.find((batch) => batch.name === name);
    if (existingBatch) {
      return res.status(400).json({ error: 'Batch with the same name already exists' });
    }
console.log("step 2")
    course.batches.push({ name:name, instructorName:instructorName });
    await course.save();
console.log("step3")
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Error adding batch to course' });
  }
};

exports.deleteBatch = async (req, res) => {
  const courseId = req.params.courseId;
  const batchId = req.params.batchId;
  console.log(courseId,batchId)

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    const batchIndex = course.batches.findIndex((batch) => batch._id.toString() === batchId);
    if (batchIndex === -1) {
      return res.status(404).json({ error: 'Batch not found' });
    }

    course.batches.splice(batchIndex, 1);

    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting batch from course' });
  }
};