const express = require("express")
const router = express.Router()
const lecturePage = require("../controllers/instructorLecture")

router.get("/:id", lecturePage.getInstructorLectures)
router.post("/login", lecturePage.login)
module.exports = router