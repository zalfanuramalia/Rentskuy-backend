const cloudinary = require('cloudinary').v2;

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

exports.cloudPath = (path) => path.split('/').slice(-4).join('/').split('.')
  .slice(0, 1)
  .join('');

exports.imageDeleted = (publicId) => {
  console.log(publicId);
  cloudinary.uploader.destroy(
    publicId,
    // (error, result) => ({ result, error }),
    (error, result) => console.log(result, error),
  );
};