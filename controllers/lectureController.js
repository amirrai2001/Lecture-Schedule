const Lecture = require('../models/lectures');

exports.getAllLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find().populate('instructor').populate('course');
    res.json(lectures);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching lectures' });
  }
};

// Add a new lecture
exports.addLecture = async (req, res) => {
  const { instructor, course, date } = req.body;

  try {
    const existingLecture = await Lecture.findOne({ instructor, date });
    if (existingLecture) {
      return res.status(400).json({ error: 'Instructor already has a lecture on the same date' });
    }

    const newLecture = new Lecture({ instructor, course, date });
    await newLecture.save();
    res.json(newLecture);
  } catch (error) {
    res.status(500).json({ error: 'Error adding lecture' });
  }
};
exports.updateLecture = async (req, res) => {
  const { instructor, course, date } = req.body;
  const { id } = req.params;

  try {
    const updatedLecture = await Lecture.findByIdAndUpdate(
      id,
      { instructor, course, date },
      { new: true }
    );
    res.json(updatedLecture);
  } catch (error) {
    res.status(500).json({ error: 'Error updating lecture' });
  }
};

exports.deleteLecture = async (req, res) => {
  const { id } = req.params;

  try {
    await Lecture.findByIdAndDelete(id);
    res.json({ message: 'Lecture deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting lecture' });
  }
};
