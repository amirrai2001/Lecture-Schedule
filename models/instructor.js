const mongoose = require("mongoose")

const instructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  assignedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecture',
  }],
  date:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecture"
  }
});

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
