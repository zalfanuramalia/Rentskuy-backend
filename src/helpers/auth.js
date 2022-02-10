const jwt = require('jsonwebtoken');
const { APP_SECRET } = process.env;

exports.verifyUser = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth.startsWith('Bearer')) {
    const token = auth.split(' ')[1];
    if (token) {
      try {
        const payload = jwt.verify(token, APP_SECRET);
        req.user = payload;
        if (payload) {
          return next();
        } else {
          return res.status(403).json({
            success: false,
            message: 'User not verified!'
          });
        }
      } catch (err) {
        return res.status(403).json({
          success: false,
          message: 'User not verified!'
        });
      }
    } else {
      return res.status(403).json({
        success: false,
        message: 'Token must be provided!'
      });
    }
  }
};