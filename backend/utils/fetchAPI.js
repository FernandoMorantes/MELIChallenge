const axios = require('axios');

// Funcion encargada de hacer el llamado a la url especificada en los parametros de la funcion
// Solo funciona para hacer consultas GET
function fetchAPI(url, params) {
    return new Promise(resolve => {
        if (url === null && url !== "") {
            resolve({
                fetchError: true,
                res: {}
            });
        } else {
            try {
                console.log("Se inicia la consulta a la url: ", url, " con params: ", params)
                axios.get(url)
                    .then(function (response) {
                        resolve({
                            fetchError: false,
                            res: response.data
                        });
                    })
                    .catch(function (error) {
                        console.log(error)
                        resolve({
                            fetchError: true,
                            res: "Error al consultar el API de MELI.\n" + error
                        })
                    });
            } catch (error) {
                console.log(error)
                resolve({
                    fetchError: true,
                    res: "Error al consultar el API de MELI.\n" + error
                });
            }
        }
    });
}

module.exports = {
    fetchAPI: fetchAPI,
};