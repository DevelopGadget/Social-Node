'use strict'

const Users = require('../Models/Usuario');

function Get(req, res) {
  Users.find({}, (err, result) => {
    if (err) return res.status(400).send('Ha ocurrido un error vuelva a intentar');
    if (!result || result.length === 0) return res.status(404).send('No hay datos');
    return res.status(200).send(result);
  })
}

function GetId(req, res) {

}

function Post(req, res) {

  let User = new Users();
  User.Username = req.body.Username;
  User.Password = req.body.Password;
  User.PhotoUrl = req.body.PhotoUrl;
  User.Nombre = req.body.Nombre;

  User.save((err, result) => {
    if (err) return res.status(400).send({ Error: err });
    return res.status(200).send(result);
  });
}

function Put(req, res) {

}

function Delete(req, res) {

}

module.exports = { Get, GetId, Post, Put, Delete }

