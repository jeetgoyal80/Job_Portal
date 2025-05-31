const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenicated');
const { Postjob, GetJobAdmin, GetJobs, GetJobById } = require('../controllers/jobcontroller');
const router = express.Router();



router.post('/register',isAuthenticated,Postjob);
router.get('/getjobs',isAuthenticated,GetJobs);
router.get('/getAdminjob/:id',isAuthenticated,GetJobAdmin);
router.get('/getjobs/:id',isAuthenticated,GetJobById);



module.exports = router;
