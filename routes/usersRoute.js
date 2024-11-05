// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const auth = require('../middlewares/auth');

// Uncomment the following line to handle user creation
router.post('/', usersController.createUser);  // This line was commented out

router.get('/', usersController.getAllUsers);
router.get('/getById/:id', usersController.getUserById);
router.get('/getProfile', usersController.getProfile);
router.delete('/:id', usersController.deleteUser);
router.put('/:id', usersController.updateUser);
router.put('/update/:id', usersController.newUserUpdate);
router.post('/changePassword', usersController.changePassword);
router.post('/register', usersController.register);
router.post('/login', usersController.login);

// Route to request a password reset
router.post('/requestPasswordReset', usersController.requestPasswordReset);

// Route to reset the password
router.post('/resetPassword', usersController.resetPassword);

router.post('/uploadProfileImage', usersController.uploadProfileImage);
router.get('/me', auth, usersController.getAllUsers);

module.exports = router;

