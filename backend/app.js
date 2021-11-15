const express = require('express');
const path = require('path');

const items = require('./routes/items');

const app = express();

// Configuracion del view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Configuracion del puerto
app.set('port', process.env.PORT || 8080);

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Utilizado para poder utilizar archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurando los headers
app.use(function (req, res, next) {

    // Solo se permite la conexion cruzada desde el frontend local
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods permitidos
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers permitidos
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Permitir que el front utilice cookies en las request enviadas
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Definicion del healthy
app.get('/api/', function (req, res) {
    res.status(500).send('MELI Challenge APÌ working!. v1.0');
});

// Definicion de la subruta para el manejo de las request de los items
app.use('/api/items', items);

// Atrapa un 404 and y lo envia al error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
// En modo desarrollo por lo que imprime el stack completo del error
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

// exportando app
module.exports = app;