'use strict'

const express = require('express');
const app = express();
const morgan = require('morgan');
const body = require('body-parser');
const mongoose = require('mongoose');
//Puerto
app.set('port', process.env.PORT || 3000);

//Uses
app.use(morgan('dev'));
app.use(body.json());
app.use(body.urlencoded({ extended: false }));

//require('./Routes/Router')(app);

mongoose.connect('mongodb://root:Fernando16@ds147451.mlab.com:47451/social-node', (err, res) => {
  if (err)  onsole.log('no conexion');
  //Listen
  app.listen(app.get('port'), () => {
    console.log('Iniciado ' + app.get('port'));
  });
});

