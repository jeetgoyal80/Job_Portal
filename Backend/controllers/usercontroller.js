const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register Controller
const Register = async (req, res) => {
  const { fullname, email, phoneNumber, password, role } = req.body;
  const files = req.files || {};

  try {
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).send({
        message: 'Missing input fields',
        success: false
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({
        message: 'Email is already registered',
        success: false
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profilePhoto = files.profilePhoto?.[0]?.path || '';
    const resume = files.resume?.[0]?.path || '';

    const user = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto,
        resume
      }
    });

    return res.status(200).send({
      message: 'User created successfully',
      success: true
    });

  } catch (error) {
    console.error("Error in Register API:", error);
    return res.status(500).send({ message: 'Server error', success: false });
  }
};

// Login Controller
const Login = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        if (!email || !password || !role) {
            return res.status(400).send({
                message: 'Missing input fields',
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({
                message: 'Email or password is incorrect',
                success: false
            });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).send({
                message: 'Email or password is incorrect',
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(400).send({
                message: 'Role does not match the account',
                success: false
            });
        }

        const userToken = {
            Id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(userToken, process.env.secretKey, { expiresIn: '1d' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // set true in production with HTTPS
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(200).send({
            message: "Login successful",
            success: true,
            user,
          
        });

    } catch (error) {
        console.log("Error in Login API:", error);
        return res.status(500).send({ message: 'Server error', success: false });
    }
};

// Logout Controller
const Logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false, // true in production
        sameSite: 'Lax'
    });

    return res.status(200).send({ message: 'Logged out successfully', success: true });
};

// Logout Controller


// Update Controller
const Update = async (req, res) => {
  const { fullname, email, phoneNumber, skills, bio } = req.body;
  const files = req.files || {};

  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found', success: false });
    }

    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    if (!user.profile) user.profile = {};

    if (skills) {
      user.profile.skills = Array.isArray(skills)
        ? skills
        : skills.split(',').map((s) => s.trim());
    }

    if (bio !== undefined) {
      user.profile.bio = bio;
    }

    if (files.profilePhoto?.length > 0) {
      user.profile.profilePhoto = files.profilePhoto[0].path;
    }

    if (files.resume?.length > 0) {
      user.profile.resume = files.resume[0].path;
    }

    await user.save();

    return res.status(200).send({
      message: 'User updated successfully',
      success: true,
      user
    });

  } catch (error) {
    console.error('Error in Update API:', error);
    return res.status(500).send({ message: 'Server error', success: false });
  }
};

module.exports = { Register, Login, Logout, Update };
