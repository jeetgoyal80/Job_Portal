const express = require('express');
const {
  RegisterCompany,
  GetCompany,
  GetCompanybyId,
  UpdateCompany
} = require('../controllers/companycontroller');
const isAuthenticated = require('../middlewares/isAuthenicated');
const upload = require('../middlewares/multer'); // Cloudinary-based multer or your multer setup

const router = express.Router();

// Register company with logo upload
router.post('/register',upload.single('logo'), isAuthenticated, RegisterCompany);

// Get all companies (no file upload)
router.get('/getAll', isAuthenticated, upload.none(), GetCompany);

// Get company by id (no file upload)
router.get('/get/:id', isAuthenticated, upload.none(), GetCompanybyId);

// Update company with optional logo upload
router.put('/update/:id',upload.single('logo'), isAuthenticated,  UpdateCompany);

module.exports = router;
