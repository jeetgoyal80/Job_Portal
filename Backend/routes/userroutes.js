const express = require('express');
const {
  Register,
  Login,
  Logout,
  Update
} = require('../controllers/usercontroller');
const isAuthenticated = require('../middlewares/isAuthenicated');
const upload = require('../middlewares/multer'); // Cloudinary-based multer

const router = express.Router();

// Accept profilePhoto and resume during registration (if needed)
router.post('/register', upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), Register);

// Accept only basic login fields
router.post('/login',upload.none(), Login);

// Logout route
router.get('/logout', isAuthenticated, Logout);

// Update user profile with profilePhoto and resume uploads
router.put('/update', isAuthenticated, upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), Update);

module.exports = router;
