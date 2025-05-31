const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.Cloudname,
  api_key: process.env.APIkey,
  api_secret: process.env.APIsecret,
});

module.exports = cloudinary;
