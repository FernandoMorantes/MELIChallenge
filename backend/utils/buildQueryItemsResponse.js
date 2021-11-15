const variables = require('../config/development.json');
const fetchAPI = require('./fetchAPI');
const extractPriceDecimals = require('./extractPriceDecimals');

function buildQueryItemsResponse(rawRes) {
    return new Promise(async resolve => {
        let buildedItems = []
        let categories = []
        try {
            await Promise.all(rawRes.slice(0, 4).map(async rawItem => {
                let newItem = {};

                let priceAndDecimals = extractPriceDecimals.extractPriceDecimals(rawItem.price);

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

                buildedItems.push(newItem);

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