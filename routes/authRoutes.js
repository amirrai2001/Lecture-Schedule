const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User login
router.post('/login', authController.login);

// User registration
router.post('/register', authController.register);

module.exports = router;
