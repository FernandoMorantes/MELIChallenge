const fetchAPI = require('../utils/fetchAPI');
const buildQueryItemsResponse = require('../utils/buildQueryItemsResponse');
const variables = require('../config/development.json');

function queryItems(req) {
    return new Promise(async resolve => {
        let statusCode;
        let message;
        let response = null;

        let queryParam = req.query.q;

        if (queryParam === undefined && queryParam !== null && queryParam !== "") {
            statusCode = 400;
            message = "El parametro de busqueda ingresado no es valido";
        } else {
            try {
                console.log("Se inicia el proceso de queryItems con atributos: ", req)
                let fetchURL = variables.urlAPIMELI + variables.endpointSearch + queryParam
                let responseFetchMELIAPI = await fetchAPI.fetchAPI(fetchURL)

                console.log("Se obtiene la respuesta al llamado del API:")
                console.log(responseFetchMELIAPI)

                if (responseFetchMELIAPI.fetchError) {
                    statusCode = 500;
                    message = "Ha ocurrido un error consultando el API de MELI.\n" + responseFetchMELIAPI.res
                } else {
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