// authRoutes.js

const express = require('express');
const authControllers = require('../controllers/authControllers');

const router = express.Router();



router.post('/register', authControllers.register);
router.post('/login', authControllers.login);
router.get(
    '/all-users', authControllers.getAllUsers);


module.exports = router;
