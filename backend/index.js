const app = require('./app');

let server = app.listen(app.get('port'), function () {
    console.log('Listening on port ' + server.address().port);
});