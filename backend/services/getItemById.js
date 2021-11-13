const fetchAPI = require('../utils/fetchAPI');
const buildItemResponse = require('../utils/buildItemResponse');
const variables = require('../config/development.json');

function getItemById(req) {
    return new Promise(async resolve =>{
        let statusCode;
        let message;
        let response = null;

        let queryParam = req.params.id;

        if (queryParam === undefined && queryParam !== null && queryParam !== "") {
            statusCode = 400;
            message = "El parametro de busqueda ingresado no es valido";
        } else {
            console.log("Se inicia el proceso de getItemById con atributos: ", req)

            let fetchURLProductInfo = variables.urlAPIMELI + variables.endpointProductInfo + queryParam
            let responseProductInfo = await fetchAPI.fetchAPI(fetchURLProductInfo)

            let fetchURLProductDescription = variables.urlAPIMELI + variables.endpointProductInfo + queryParam + variables.endpointProductDescription
            let responseProductDescription = await fetchAPI.fetchAPI(fetchURLProductDescription)

            console.log("Se obtiene la informacion del producto mediante el llamado a las 2 APIs:")
            console.log(responseProductInfo)
            console.log(responseProductDescription)

            if (responseProductInfo.fetchError || responseProductDescription.fetchError) {
                statusCode = 500;
                message = "Ha ocurrido un error consultando el API de MELI."
            }else{
                let responseBuild = await buildItemResponse.buildItemResponse(responseProductInfo.res, responseProductDescription.res)
                if (responseBuild.buildResError) {
                    statusCode = 500;
                    message = "Error al mapear la respuesta de la busqueda";
                } else {
                    statusCode = 200;
                    message = "OK";
                    response = responseBuild.res
                }
            }

            statusCode = 200;
            message = "OK";
        }

        resolve({
            statusCode: statusCode,
            message: message,
            response: response
        });
    });
}

module.exports = {
    getItemById: getItemById,
};