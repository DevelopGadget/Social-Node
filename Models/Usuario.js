const moongose = require("mongoose");
const Model = moongose.Schema;

const Usuario = Model({
  Username : String,
  Password : String,
  PhotoUrl : String,
  Nombre : String,
});

module.exports = moongose.model('Usuario', Usuario);