const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
  },
  size: {
    type: String,
  },
  founded: {
    type: Number,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  website: {
    type: String,
  },
  logo: {
    type: String, // Ideally URL or path to stored image
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
