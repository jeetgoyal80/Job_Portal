const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenicated');
const { ApplyJob, getAppliedJob, getApplicants, updatestatus, checkIfApplied } = require('../controllers/applicantcontroller');
const router = express.Router();


router.get('/apply/:id',isAuthenticated,ApplyJob);
router.get('/check-apply/:id',isAuthenticated,checkIfApplied);
router.get('/all-appliedJobs',isAuthenticated,getAppliedJob);
router.get('/all-applicant/:id',isAuthenticated,getApplicants);
router.put('/update-status/:id',isAuthenticated,updatestatus);

module.exports = router;