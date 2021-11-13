

function buildItemResponse(responseProductInfo, responseProductDescription) {
    return new Promise(async resolve => {
        try {
            let item = {};

            item["id"] = responseProductInfo.id;
            item["title"] = responseProductInfo.title;
            item["price"] = {
                "currency": responseProductInfo.currency_id,
                "amount": responseProductInfo.price,
                "decimals": responseProductInfo.price,
            };
            item["picture"] = responseProductInfo.thumbnail;
            item["condition"] = responseProductInfo.condition;
            item["free_shipping"] = responseProductInfo.shipping.free_shipping;
            item["sold_quantity"] = responseProductInfo.sold_quantity;
            item["description"] = responseProductDescription.plain_text;

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