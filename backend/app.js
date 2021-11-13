const express = require('express');
const path = require('path');

const items = require('./routes/items');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.set('port', process.env.PORT || 8080);

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use(express.static(path.join(__dirname, 'public')));

// healthy
app.get('/', function (req, res) {
    res.status(500).send('API Challenge MELI working!. v1.0');
});

app.use('/api/items', items);

// Error handlers

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler will print stacktrace
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

// export app
module.exports = app;