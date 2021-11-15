const extractPriceDecimals = require('./extractPriceDecimals');

// Funcion encargada de mapear la informacion recibida del API de items de MELI en 
// el objeto item retornado por este API
function buildItemResponse(responseProductInfo, responseProductDescription) {
    return new Promise(async resolve => {
        try {
            let item = {};

            // Se llama a la funcion encargada de extraer el precia como un entero
            // y sus decimales como un float
            let priceAndDecimals = extractPriceDecimals.extractPriceDecimals(responseProductInfo.price);

            // Se realiza el mapeo para cada propiedad del objeto item
            item["id"] = responseProductInfo.id;
            item["title"] = responseProductInfo.title;
            item["price"] = {
                "currency": responseProductInfo.currency_id,
                "amount": priceAndDecimals.price,
                "decimals": priceAndDecimals.decimals,
            };
            item["picture"] = responseProductInfo.thumbnail;
            item["condition"] = responseProductInfo.condition;
            item["free_shipping"] = responseProductInfo.shipping.free_shipping;
            item["sold_quantity"] = responseProductInfo.sold_quantity;
            item["description"] = responseProductDescription.plain_text;
            item["category"] = [responseProductInfo.category_id];

            resolve({
                buildResError: false,
                res: {
                    author: {
                        name: "José Fernando",
                        lastname: "Morantes Florez"
                    },
                    item: item
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
    buildItemResponse: buildItemResponse,
};