const variables = require('../config/development.json');
const fetchAPI = require('./fetchAPI');

function buildQueryItemsResponse(rawRes) {
    return new Promise(async resolve => {
        let buildedItems = []
        let categories = []
        try {

            await Promise.all(rawRes.map(async rawItem => {
                let newItem = {};

                newItem["id"] = rawItem.id;
                newItem["title"] = rawItem.title;
                newItem["price"] = {
                    "currency": rawItem.currency_id,
                    "amount": rawItem.price,
                    "decimals": rawItem.price,
                };
                newItem["picture"] = rawItem.thumbnail;
                newItem["condition"] = rawItem.condition;
                newItem["free_shipping"] = rawItem.shipping.free_shipping;
                newItem["address"] = `${rawItem.address.city_name}, ${rawItem.address.state_name}`;

                buildedItems.push(newItem);

                let fetchURL = variables.urlAPIMELI + variables.endpointCategories + rawItem.category_id;
                let categoryNameResponse = await fetchAPI.fetchAPI(fetchURL);

                if (!categoryNameResponse.fetchError){
                    categories.push(categoryNameResponse.res.name);
                }
                
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