const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authMiddleware');
const lectureController = require('../controllers/lectureController');

// Add a new lecture
router.post('/', lectureController.addLecture);

// Update a lecture
router.put('/:id', lectureController.updateLecture);

// Delete a lecture
router.delete('/:id', lectureController.deleteLecture);


router.get('/', lectureController.getAllLectures)


module.exports = router;
