const Application = require("../models/application");
const JobModel = require("../models/job");

// Apply for a job
const ApplyJob = async (req, res) => {
    const userid = req.id;
    const jobid = req.params.id;

    try {
        if (!jobid) {
            return res.status(400).send({
                message: 'Job ID is required',
                success: false
            });
        }

        const existing = await Application.findOne({ job: jobid, applicant: userid });
        if (existing) {
            return res.status(400).send({
                message: 'You have already applied for this job',
                success: false
            });
        }

        const jobData = await JobModel.findById(jobid);
        if (!jobData) {
            return res.status(404).send({
                message: 'Job not found',
                success: false
            });
        }

        // Create the application
        const newApplication = await Application.create({
            job: jobid,
            applicant: userid
        });

        // Push to job's applications array
        jobData.applications.push(newApplication._id);
        await jobData.save();

        // Populate the application with applicant data
        const populatedApplication = await Application.findById(newApplication._id)
            .populate('applications'); 
           
            // customize fields as needed

        return res.status(200).send({
            message: 'Applied successfully',
            success: true,
            application: populatedApplication
        });

    } catch (error) {
        console.log('Error in ApplyJob API:', error);
        return res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            error: error.message
        });
    }
};

// GET /api/application/check-applied/:jobid
const checkIfApplied = async (req, res) => {
  const userid = req.id;
  const jobid = req.params.jobid;

  try {
    const existing = await Application.findOne({ job: jobid, applicant: userid });
    return res.status(200).send({
      applied: !!existing,
      success: true
    });
  } catch (error) {
    console.log('Error in checkIfApplied:', error);
    return res.status(500).send({
      message: 'Server error',
      success: false
    });
  }
};


// Get all jobs applied by a user
const getAppliedJob = async (req, res) => {
    const userid = req.id;

    try {
        const jobs = await Application.find({ applicant: userid })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                populate: {
                    path: 'company',
                    options: { sort: { createdAt: -1 } }
                }
            });

        if (!jobs || jobs.length === 0) {
            return res.status(404).send({
                message: 'No applied jobs found',
                success: false
            });
        }

        return res.status(200).send({
            message: 'Applied jobs fetched successfully',
            success: true,
            jobs
        });

    } catch (error) {
        console.log('Error in getAppliedJob API:', error);
        return res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            error: error.message
        });
    }
};

// Get all applicants for a job
const getApplicants = async (req, res) => {
    const jobid = req.params.id;

    try {
        const jobData = await JobModel.findById(jobid)
            .populate({
                path: 'applications',
                populate: {
                    path: 'applicant',
                    select: 'fullname email profile'
                }
            });

        if (!jobData) {
            return res.status(404).send({
                message: 'Job not found',
                success: false
            });
        }

        return res.status(200).send({
            message: 'Applicants fetched successfully',
            success: true,
            applicants: jobData.applications
        });

    } catch (error) {
        console.log('Error in getApplicants API:', error);
        return res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            error: error.message
        });
    }
};

// Update application status
const updatestatus = async (req, res) => {
    const applicantid = req.params.id;
    const { status } = req.body;

    try {
        if (!status) {
            return res.status(400).send({
                message: 'Status is required',
                success: false
            });
        }

        if (!applicantid) {
            return res.status(400).send({
                message: 'Applicant ID is required',
                success: false
            });
        }

        const applicant = await Application.findById(applicantid);
        if (!applicant) {
            return res.status(404).send({
                message: 'Application not found',
                success: false
            });
        }

        applicant.status = status.toLowerCase();
        await applicant.save();

        return res.status(200).send({
            message: 'Application status updated successfully',
            success: true
        });

    } catch (error) {
        console.log('Error in updatestatus API:', error);
        return res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    ApplyJob,
    getAppliedJob,
    getApplicants,
    updatestatus,
    checkIfApplied
};
