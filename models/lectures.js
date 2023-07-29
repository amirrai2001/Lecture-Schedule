const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
