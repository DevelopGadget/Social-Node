'use strict'

const Users = require('../Models/Usuario');
const Crypto = require('crypto');
const Jwt = require('../Services/Jwt');

function Get(req, res) {
  if (!req.headers.authorization) return res.status(401).send('no autorizado');
  if (Jwt.Decode(req.headers.authorization) == false) return res.status(401).send('no autorizado');
  Users.find({}, (err, result) => {
    if (err) return res.status(400).send(err);
    if (!result || result.length === 0) return res.status(404).send('No hay datos');
    return res.status(200).send(result);
  })
}

function GetId(req, res) {
  if (!req.headers.authorization) return res.status(401).send('no autorizado');
  const Decode = Jwt.Decode(req.headers.authorization);
  if (Decode == false) return res.status(401).send('no autorizado');
  if (Decode.sub !== req.params.Id) return res.status(401).send('Ids no coinciden');
  Users.findById(req.params.Id, (err, result) => {
    if (err) return res.status(400).send(err);
    if (!result || result.length === 0) return res.status(404).send('No hay datos');
    return res.status(200).send(result);
  })
}

function Post(req, res) {

  let User = new Users();
  User.Username = req.body.Username;
  User.Password = req.body.Password ? Crypto.createHmac('sha256', 'Secret').update(req.body.Password).digest('base64') : req.body.Password;
  User.PhotoUrl = req.body.PhotoUrl;
  User.Nombre = req.body.Nombre;

  User.save((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(Jwt.CreateToken(result));
  });
}

function Put(req, res) {
  if (!req.headers.authorization) return res.status(401).send('no autorizado');
  const Decode = Jwt.Decode(req.headers.authorization);
  if (Decode == false) return res.status(401).send('no autorizado');
  if (Decode.sub !== req.params.Id) return res.status(401).send('Ids no coinciden');
  Users.findByIdAndUpdate(req.params.Id, req.body, (err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(result);
  })
}

function Delete(req, res) {
  if (!req.headers.authorization) return res.status(401).send('no autorizado');
  const Decode = Jwt.Decode(req.headers.authorization);
  if (Decode == false) return res.status(401).send('no autorizado');
  if (Decode.sub !== req.params.Id) return res.status(401).send('Ids no coinciden');
  Users.findById(req.params.Id, (err, result) => {
    if (err) return res.status(400).send(err);
    if (!result || result.length === 0) return res.status(404).send('No hay datos');
    result.remove(error => {
      if (err) return res.status(400).send(error);
      return res.status(200).send('Eliminado');
    })
  })
}

module.exports = { Get, GetId, Post, Put, Delete }

