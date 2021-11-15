function extractPriceDecimals(price) {
    return {
        price: Math.floor(price),
        decimals: parseFloat((price % 1).toFixed(2))
    }
}

module.exports = {
    extractPriceDecimals: extractPriceDecimals,
};