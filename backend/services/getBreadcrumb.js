const fetchAPI = require('../utils/fetchAPI');
const mostFrequentItem = require('../utils/mostFrequentItem');
const variables = require('../config/development.json');

// Devuelve los elementos de ruta de navegación (breadcrumb) basados en la
// categoría más común encontrada en el array recibido como parametro
function getBreadcrumb(req) {
    return new Promise(async resolve => {
        // Definicion de las variables del response del servicio que se retornara al final de la funcion
        let statusCode;
        let message;
        let response = null;

        // Se obtiene el arreglo de IDs de categorias en el body del post
        let reqBody = req.body

        if (reqBody === undefined && reqBody !== null && reqBody !== []) {
            statusCode = 400;
            message = "El parametro de busqueda ingresado no es valido";
        } else {
            console.log("Se inicia el proceso de getBreadcrumb con atributos: ", reqBody)

            // Se llama a la funcion encargada de encontrar el elemento mas comun 
            // dentro del arreglo de categorias 
            let mostFrequentCategory = await mostFrequentItem.mostFrequentItem(reqBody.categories, reqBody.categories.length)

            // Se construye la url de consulta al API de categorias de MELI con la
            // categoria mas comun encontrada y se llama  a la funcion encargada de hacer el llamado al API
            let fetchURL = variables.urlAPIMELI + variables.endpointCategories + mostFrequentCategory;
            let categoryResponse = await fetchAPI.fetchAPI(fetchURL);

            if (!categoryResponse.fetchError) {
                response = []

                // Se construye la respuesta como un arreglo de strings con las categorias
                // que hacen parte de la ruta de navegacion (breadcrumb)
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