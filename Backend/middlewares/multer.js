const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = 'user_uploads';
    let resource_type = 'image';
    
    if (file.mimetype.startsWith('application/')) {
      resource_type = 'raw'; // for PDF, DOC, etc.
    }

    return {
      folder,
      resource_type,
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
