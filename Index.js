'use strict'

const express = require('express');
const app = express();
const morgan = require('morgan');
const body = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
//Puerto
app.set('port', process.env.PORT || 3000);

//Uses
app.use(cors());
app.use(morgan('dev'));
app.use(body.json());
app.use(body.urlencoded({ extended: false }));

require('./Routes/Router')(app);

mongoose.connect(process.env.Mlab, (err, res) => {
  if (err)  console.log('no conexion');
  //Listen
  app.listen(app.get('port'), () => {
    console.log('Iniciado ' + app.get('port'));
  });
});

