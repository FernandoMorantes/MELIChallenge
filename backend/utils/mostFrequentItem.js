// Funcion encargada de encontar el elemento mas frecuente dentro de un arreglo
function mostFrequentItem(arr, n) {
    return new Promise(resolve => {
        // Se ordena el arreglo de mayor a menor (si es un arreglo de estrings se ordena lexicograficamente)
        arr.sort();

        let max_count = 1,
            res = arr[0];
        let curr_count = 1;

        // Entontrando el elemento con mayor frecuencia recorriendo linearmente el arreglo ordenado
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