const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:'rentskuy/uploads',
    format : async ()=>'png',
    public_id : (req)=>{
      const timestamp = Date.now();
      return `${req.fileUpload}-${timestamp}`;
    },
  },
});

const fileFilter = (req, file, cb) => {
  const typeImage = [
    'image/jpeg',
    'image/png',
    'image/gif'
  ];

  if (!typeImage.includes(file.mimetype)) {
    cb(new Error('Type image must be .jpg/.png/.gif'), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage: storage, fileFilter, limits: { fileSize: 2000000 } });

module.exports = upload;

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

