const moongose = require("mongoose");
const Model = moongose.Schema;

const Usuario = Model({
  Username : {type: String, unique: true, required: true},
  Password : {type: String, required: true},
  PhotoUrl : {type: String, required: true},
  Nombre : {type: String, required: true},
  creado: { type: Date, default: Date.now() }
});

module.exports = moongose.model('Usuario', Usuario);