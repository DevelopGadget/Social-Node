'use strict'

var User = require('../Controllers/UsuarioController');

module.exports = function (app){
  app.get('/User', User.Get);
  app.post('/User', User.Post);
  app.post('/Login', User.Login);
  app.put('/User/:Id', User.Put);
  app.delete('/User/:Id', User.Delete);
  app.get('/User/:Id', User.GetId);
}