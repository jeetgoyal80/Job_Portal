const JWT = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send({
      message: 'Unauthorized: No token provided',
      success: false
    });
  }

  try {
    const decode = JWT.verify(token, process.env.secretKey);
    req.id = decode.Id;
    next();
  } catch (err) {
    return res.status(401).send({
      message: 'Unauthorized: Invalid token',
      success: false
    });
  }
};

module.exports = isAuthenticated;
