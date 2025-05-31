const Job = require('../models/job');


const Postjob = async (req, res) => {
    const { title, description, requirements, jobtype, experienceLevel, salary, position,company,locations } = req.body;
    try {
        // if (!title || !description || !requirements || !jobtype || !experienceLevel || !salary || !position || !company || !locations) {
        //     return res.status(400).send({
        //         message: 'All fields are required',
        //         success: false
        //     });
        // }
        const userid = req.id;
        const requirementsArray = Array.isArray(requirements) ? requirements : requirements.split(',');

       const job = await Job.create({
            title,description,requirements:requirementsArray,jobtype,experienceLevel:Number(experienceLevel),salary:Number(salary),position,company,created_by:userid,locations

        })
        return res.status(200).send({
            message: 'Job registered successfully',
            success: true
        });
    }
        catch (error) {
            console.log('Error in Postjob API:', error);
            return res.status(500).send({
                message: 'Internal Server Error',
                success: false,
                error: error.message
            });
            

        }

    
}
// for admin
const GetJobAdmin = async (req, res) => {
  const userId = req.id;
  const companyId = req.params.id;

  try {
    const jobs = await Job.find({ created_by: userId, company: companyId });

    if (jobs.length === 0) {
      return res.status(404).send({
        message: 'No jobs found for this company.',
        success: false
      });
    }

    return res.status(200).send({
      message: 'Jobs fetched successfully.',
      success: true,
      jobs
    });

  } catch (error) {
    console.error('Error in GetJobAdmin API:', error);
    return res.status(500).send({
      message: 'Internal Server Error',
      success: false,
      error: error.message
    });
  }
};
const GetJobById = async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findById(jobId)
      .populate('company', 'name logo') // populate company name and logo
      .populate({
        path: 'applications',
        populate: {
          path: 'applicant',
          
        },
      });

    if (!job) {
      return res.status(400).send({
        message: 'Not found',
        success: false,
      });
    }

    return res.status(200).send({
      message: 'Job fetched successfully',
      success: true,
      job,
    });
  } catch (error) {
    console.log('Error in GetJobById API:', error);
    return res.status(500).send({
      message: 'Internal Server Error',
      success: false,
      error: error.message,
    });
  }
};


const GetJobs = async (req, res) => {
    try {
        const {
            jobtype,
            experienceLevel,
            minSalary,
            maxSalary,
            location,
            title,
            position,
            page = 1,
            limit = 10
        } = req.query;

        const filter = {};

        if (jobtype) filter.jobtype = jobtype;

        if (experienceLevel) filter.experienceLevel = parseInt(experienceLevel);

        if (position) filter.position = parseInt(position);

        if (minSalary || maxSalary) {
            filter.salary = {};
            if (minSalary) filter.salary.$gte = parseInt(minSalary);
            if (maxSalary) filter.salary.$lte = parseInt(maxSalary);
        }

        if (location) {
            const locationsArray = location.split(',').map(loc => loc.trim());
            filter.locations = { $in: locationsArray };
        }

        if (title) {
            filter.title = { $regex: title, $options: 'i' }; // case-insensitive partial match
        }

        const jobs = await Job.find(filter)
            .populate('company', 'name location website logo')  // Added 'logo' here
            .populate('created_by', 'name email')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        return res.status(200).json({
            message: 'Jobs fetched successfully',
            success: true,
            total: jobs.length,
            jobs
        });
    } catch (error) {
        console.error('Error in GetJobs:', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: error.message
        });
    }
};




module.exports={Postjob,GetJobAdmin,GetJobById,GetJobs};
