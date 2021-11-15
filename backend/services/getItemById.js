const fetchAPI = require('../utils/fetchAPI');
const buildItemResponse = require('../utils/buildItemResponse');
const variables = require('../config/development.json');

// Se recibe un ID de un item especifico y el sewrvicio retorna
// la informacion relacionada a ese item
function getItemById(req) {
    return new Promise(async resolve => {
        // Definicion de las variables del response del servicio que se retornara al final de la funcion
        let statusCode;
        let message;
        let response = null;

        // Se obtiene el id del item desde el path
        let queryParam = req.params.id;

        if (queryParam === undefined && queryParam !== null && queryParam !== "") {
            statusCode = 400;
            message = "El parametro de busqueda ingresado no es valido";
        } else {
            console.log("Se inicia el proceso de getItemById con atributos: ", req)

            // Se construye la url de consulta al API de items de MELI y se llama 
            // a la funcion encargada de hacer este llamado
            let fetchURLProductInfo = variables.urlAPIMELI + variables.endpointProductInfo + queryParam
            let responseProductInfo = await fetchAPI.fetchAPI(fetchURLProductInfo)

            // Se construye la url de consulta al API que retorna la descripcion de los
            // items de MELI y se llama  a la funcion encargada de hacer este llamado
            let fetchURLProductDescription = variables.urlAPIMELI + variables.endpointProductInfo + queryParam + variables.endpointProductDescription
            let responseProductDescription = await fetchAPI.fetchAPI(fetchURLProductDescription)

            console.log("Se obtiene la informacion del producto mediante el llamado a las 2 APIs:")
            console.log(responseProductInfo)
            console.log(responseProductDescription)

            if (responseProductInfo.fetchError || responseProductDescription.fetchError) {
                statusCode = 500;
                message = "Ha ocurrido un error consultando el API de MELI."

            } else {
                // Si se obtiene una respuesta del API de MELI se llama al metodo que mapea dicha informacion
                // recibida a la estructura definida para la respuesta de este servicio
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