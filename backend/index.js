const app = require('./app');

// Iniciar el API con las configuraciones y detalles especificadas en el archivo de api.js
let server = app.listen(app.get('port'), function () {
    console.log('Listening on port ' + server.address().port);
});