const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const response = require('./response');

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: (req) => {
      let { baseUrl } = req;
      if (baseUrl === '/profile') {
        baseUrl = '/user';
      }
      return `rentskuy/uploads/${baseUrl}`;
    },
    format: async () => 'png',
    public_id: (req) => {
      const timestamp = Date.now();
      let { baseUrl } = req;
      if (baseUrl === '/profile') {
        baseUrl = '/user';
      }
      return `${baseUrl}-${timestamp}`;
    },
  },
});

function imageFileFilter(req, file, cb) {
  const supportedMimeType = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/tiff'];
  if (!supportedMimeType.includes(file.mimetype)) {
    cb(new Error('Filetype mismatch!'), false);
  } else {
    cb(null, true);
  }
}

const uploadImage = (key, sum, maxSize = null) => {
  const upload = multer({
    storage,
    fileFilter: imageFileFilter,
    limits: {
      fileSize: maxSize || 2097152, // max 2MB
    },
  }).array(key, sum);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        return response(res, 400, err.message);
      }
      return next();
    });
  };
};

module.exports = uploadImage;

// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const _file = file.originalname.split('.');
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, _file[0] + '-' + uniqueSuffix + '.' + _file[1]);
//   } 
// });

// const fileFilter = (req, file, cb) => {
//   const supportedMime = [
//     'image/jpeg', 
//     'image/png', 
//     'image/gif'
//   ];
//   if(!supportedMime.includes(file.mimetype)){
//     cb(new Error('Filetype mismatch!'), false);
//   } else{
//     cb(null, true);
//   }
// };

// const upload = multer({storage: storage, fileFilter, limits:{
//   fileSize: 2097152
// } });

// module.exports = upload;

