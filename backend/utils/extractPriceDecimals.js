// Funcion encargada de extraer la parte entera de un numero y la parte decimal del mismo
function extractPriceDecimals(price) {
    return {
        price: Math.floor(price),
        decimals: parseFloat((price % 1).toFixed(2))
    }
}

module.exports = {
    extractPriceDecimals: extractPriceDecimals,
};