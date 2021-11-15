const fetchAPI = require('../utils/fetchAPI');
const mostFrequentItem = require('../utils/mostFrequentItem');
const variables = require('../config/development.json');

function getBreadcrumb(req) {
    return new Promise(async resolve => {
        let statusCode;
        let message;
        let response = null;

        let reqBody = req.body

        if (reqBody === undefined && reqBody !== null && reqBody !== []) {
            statusCode = 400;
            message = "El parametro de busqueda ingresado no es valido";
        } else {
            console.log("Se inicia el proceso de getBreadcrumb con atributos: ", reqBody)

            let mostFrequentCategory = await mostFrequentItem.mostFrequentItem(reqBody.categories, reqBody.categories.length)

            let fetchURL = variables.urlAPIMELI + variables.endpointCategories + mostFrequentCategory;
            let categoryResponse = await fetchAPI.fetchAPI(fetchURL);

            if (!categoryResponse.fetchError) {
                response = []

                categoryResponse.res.path_from_root.forEach(category => {
                    response.push(category.name)
                });

                statusCode = 200;
                message = "OK";

            } else {
                statusCode = 500;
                message = "Error al consultar el API de categorias";
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
    getBreadcrumb: getBreadcrumb,
};