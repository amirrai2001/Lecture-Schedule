const Instructor = require('../models/instructor');

// Get all instructors
exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching instructors' });
  }
};

// Add a new instructor
exports.addInstructor = async (req, res) => {
  const { name, password } = req.body;


  try {
    const existingInstructor = await Instructor.findOne({ name });
    if (existingInstructor) {
      return res.status(400).json({ error: "Name already exists" });
    }
    const newInstructor =  Instructor.create({
      name:name,
      password:password
    });
console.log(newInstructor)
    await newInstructor.save();
    res.status(200).json({error: "new instructor created"})
  } catch (error) {
    res.status(500).json({ error: 'Error adding instructor' });
  }
};


exports.updateInstructor = async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;

  try {
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    res.json(updatedInstructor);
  } catch (error) {
    res.status(500).json({ error: 'Error updating instructor' });
  }
};

exports.deleteInstructor = async (req, res) => {
  const { id } = req.params;

  try {
    await Instructor.findByIdAndDelete(id);
    res.json({ message: 'Instructor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting instructor' });
  }
};
