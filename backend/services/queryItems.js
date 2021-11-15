const fetchAPI = require('../utils/fetchAPI');
const buildQueryItemsResponse = require('../utils/buildQueryItemsResponse');
const variables = require('../config/development.json');

// Se recibe un string de busqueda, llama a la API de MELI para recuperar 
// los productos que coinciden con la consulta específica.
function queryItems(req) {
    return new Promise(async resolve => {
        // Definicion de las variables del response del servicio que se retornara al final de la funcion
        let statusCode;
        let message;
        let response = null;

        // Se obtiene el query string
        let queryParam = req.query.q;

        if (queryParam === undefined && queryParam !== null && queryParam !== "") {
            statusCode = 400;
            message = "El parametro de busqueda ingresado no es valido";
        } else {
            try {
                console.log("Se inicia el proceso de queryItems con atributos: ", req)

                // Se construye la url de consulta al API de busquedas de MELI y 
                // se llama a la funcion encargada de hacer este llamado
                let fetchURL = variables.urlAPIMELI + variables.endpointSearch + queryParam
                let responseFetchMELIAPI = await fetchAPI.fetchAPI(fetchURL)

                console.log("Se obtiene la respuesta al llamado del API:")
                console.log(responseFetchMELIAPI)

                if (responseFetchMELIAPI.fetchError) {
                    statusCode = 500;
                    message = "Ha ocurrido un error consultando el API de MELI.\n" + responseFetchMELIAPI.res

                } else {
                    // Si se obtiene una respuesta del API de MELI se llama al metodo que mapea dicha informacion
                    // recibida a la estructura definida para la respuesta de este servicio
                    let responseBuild = await buildQueryItemsResponse.buildQueryItemsResponse(responseFetchMELIAPI.res.results)
                    if (responseBuild.buildResError) {
                        statusCode = 500;
                        message = "Error al mapear la respuesta de la busqueda";
                    } else {
                        statusCode = 200;
                        message = "OK";
                        response = responseBuild.res
                    }

                }
            } catch (error) {
                console.log(error)
                statusCode = 500;
                message = "Ha ocurrido un error inesperado.\n" + error
            }
        }

        resolve({
            statusCode: statusCode,
            message: message,
            response: response
        });
    });
}

module.exports = {
    queryItems: queryItems,
};