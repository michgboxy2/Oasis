const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const APP_SECRET = "jsonweb";

function getUserId(context) {
//   const Authorization = context.request.get('Authorization')
const Authorization = context.headers.authorization;
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { id } = jwt.verify(token, APP_SECRET);
    return id;
  }

  throw new Error('Not authenticated')
}

module.exports = {
  APP_SECRET,
  getUserId,
}