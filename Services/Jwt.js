'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');

function CreateToken(user) {
  return jwt.encode({
    sub: {Id: user._id, Username: user.Username, Nombre: user.Nombre, PhotoUrl: user.PhotoUrl},
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix()
  }, process.env.Llave);
}

function Decode(Token) {
  try {
    const Payload = jwt.decode((Token.split(' ')[1]), process.env.Llave);
    if (Payload.exp <= moment().unix()) return false;
    return Payload;
  } catch (e) {
    return false;
  }
  return true;
}

module.exports = { CreateToken, Decode }