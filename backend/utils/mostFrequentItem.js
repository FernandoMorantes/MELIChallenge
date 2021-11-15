function mostFrequentItem(arr, n) {
    return new Promise(resolve => {
        arr.sort();

        // Entontrando el elemento con mayot frecuencia recorriendo linearmente el arreglo ordenado
        let max_count = 1,
            res = arr[0];
        let curr_count = 1;

        for (let i = 1; i < n; i++) {
            if (arr[i] == arr[i - 1])
                curr_count++;
            else {
                if (curr_count > max_count) {
                    max_count = curr_count;
                    res = arr[i - 1];
                }
                curr_count = 1;
            }
        }

        // Si el ultimo elemento es el mas frecuente
        if (curr_count > max_count) {
            max_count = curr_count;
            res = arr[n - 1];
        }

        resolve(res);

    })
    
}

module.exports = {
    mostFrequentItem: mostFrequentItem,
};