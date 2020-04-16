'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/portafolio')
    .then(() => {
        console.log('Conexion realizada');

        //Creacion del servidor
        app.listen(port, () => {
            console.log('servidor funcionando en el localhost 3700')
        })
    })
    .catch(err => console.log(err));