const Instructor = require('../models/instructor');
const Lecture = require("../models/lectures")
const bcrypt = require("bcrypt")

exports.getInstructorLectures = async (req, res) => {
  try {
    const instructorId = req.params.id;

    const lectures = await Lecture.find({ instructor: instructorId })
      .populate('instructor', 'name') // Only select the 'name' field from the Instructor model
      .populate('course', 'name') // Only select the 'name' and 'date' fields from the Course model
      .exec();

    if (!lectures || lectures.length === 0) {
      return res.status(404).json({ error: 'Instructor not found' });
    }

    const instructorDetails = {
      name: lectures[0].instructor.name,
      assignedCourses: lectures.map((lecture) => {
        return {
          name: lecture.course.name,
          date: lecture.date,
        };
      }),
    };

    return res.status(200).json(instructorDetails);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching instructor details' });
  }
};


  
  exports.login = async (req, res) => {
    const { name, password } = req.body;
  
    try {
      const instructor = await Instructor.findOne({ name: name });
  
      if (!instructor) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const passwordMatch = (password === instructor.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const { _id, name: instructorName } = instructor;
      return res.json({ _id, name: instructorName });
    } catch (error) {
      res.status(500).json({ error: 'Error during login' });
    }
  };
  