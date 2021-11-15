const variables = require('../config/development.json');
const fetchAPI = require('./fetchAPI');
const extractPriceDecimals = require('./extractPriceDecimals');

// Funcion encargada de mapear la informacion recibida del API de MELI en 
// los objetos de item retornados por este API
function buildQueryItemsResponse(rawRes) {
    return new Promise(async resolve => {
        let buildedItems = []
        let categories = []
        try {
            // Se realiza el proceso de mapeado con los primeros 4 items del array
            await Promise.all(rawRes.slice(0, 4).map(async rawItem => {
                let newItem = {};

                // Se llama a la funcion encargada de extraer el precia como un entero
                // y sus decimales como un float
                let priceAndDecimals = extractPriceDecimals.extractPriceDecimals(rawItem.price);

                // Se realiza el mapeo para cada propiedad del objeto item
                newItem["id"] = rawItem.id;
                newItem["title"] = rawItem.title;
                newItem["price"] = {
                    "currency": rawItem.currency_id,
                    "amount": priceAndDecimals.price,
                    "decimals": priceAndDecimals.decimals,
                };
                newItem["picture"] = rawItem.thumbnail;
                newItem["condition"] = rawItem.condition;
                newItem["free_shipping"] = rawItem.shipping.free_shipping;
                newItem["address"] = `${rawItem.address.city_name}, ${rawItem.address.state_name}`;

                // Se agrega el item construido al array final
                buildedItems.push(newItem);

                // Se agrega el ID de la categoria al array de categorias
                categories.push(rawItem.category_id);

            }));

            resolve({
                buildResError: false,
                res: {
                    author: {
                        name: "José Fernando",
                        lastname: "Morantes Florez"
                    },
                    categories: categories,
                    items: buildedItems
                }
            });

        } catch (error) {
            console.log(error)
            resolve({
                buildResError: true,
                res: {
                    author: {
                        name: "José Fernando",
                        lastname: "Morantes Florez"
                    }
                }
            });
        }
    });
}

module.exports = {
    buildQueryItemsResponse: buildQueryItemsResponse,
};