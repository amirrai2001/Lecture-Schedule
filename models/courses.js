const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  instructorName: {
    type: String,
  
  },
});

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  batches: {
    type: [batchSchema]
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
