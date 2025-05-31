const Company = require('../models/company');

const RegisterCompany = async (req, res) => {
  const {
    name,
    industry,
    size,
    founded,
    description,
    location,
    website,
  } = req.body;
  const logo = req.file; // multer file object
  console.log(req.body , req.file);

  try {
    if (!name) {
      return res.status(400).send({
        message: 'Missing company name',
        success: false,
      });
    }

    const company = await Company.findOne({ name });
    if (company) {
      return res.status(400).send({
        message: 'Company with this name is already registered',
        success: false,
      });
    }

    const userid = req.id; // Assuming req.id is set from auth middleware
    if (!userid) {
      return res.status(401).send({
        message: 'Unauthorized user',
        success: false,
      });
    }

    await Company.create({
      name,
      industry,
      size,
      founded: founded ? Number(founded) : undefined, // convert to number if provided
      description,
      location,
      website,
      logo: logo ? logo.path || logo.filename : undefined, // depends on multer config
      userId: userid,
    });

    return res.status(200).send({
      message: 'Your company is registered successfully',
      success: true,
    });
  } catch (error) {
    console.error('Error in registerCompany API:', error);
      console.log(req.body , req.file);
    return res.status(500).send({
      message: 'Internal Server Error',
      success: false,
      error: error.message,
    });
  }
};

const GetCompany = async (req, res) => {
    try {
        const userid = req.id;
        const companies = await Company.find({ userId: userid });
        if (!companies) {
            return res.status(400).send({
                message: 'Company Not Found',
                success: false
            });
        }
        return res.status(200).send({
            message: 'Company fetched successfully',
            companies,
            success: true
        });
    } catch (error) {
        console.log('Error in GetCompany API:', error);
        return res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            error: error.message
        });
    }
};

const GetCompanybyId = async (req, res) => {
    const companyid = req.params.id;
    try {
        const company = await Company.findById(companyid);
        if (!company) {
            return res.status(400).send({
                message: 'Company Not Found',
                success: false
            });
        }
        return res.status(200).send({
            message: 'Company fetched successfully',
            company,
            success: true
        });
    } catch (error) {
        console.log('Error in GetCompanyById API:', error);
        return res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            error: error.message
        });
    }
};

const UpdateCompany = async (req, res) => {
    const { name, location, description, website, industry, logo } = req.body;

    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).send({
                message: 'Company not found',
                success: false
            });
        }

        // Update fields
        company.name = name || company.name;
        company.description = description || company.description;
        company.website = website || company.website;
        company.location = location || company.location;
        company.industry = industry || company.industry;
        company.logo = logo || company.logo;

        await company.save();

        return res.status(200).send({
            message: 'Company updated successfully',
            company,
            success: true
        });

    } catch (error) {
        console.error('Error in UpdateCompany API:', error);
        return res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            error: error.message
        });
    }
};


module.exports = {
    RegisterCompany,
    GetCompany,
    GetCompanybyId,
    UpdateCompany
};
