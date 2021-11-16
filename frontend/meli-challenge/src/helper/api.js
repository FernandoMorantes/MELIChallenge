
import * as axios from "axios";

// Se define la clase Api la cual se encarga de hacer los llamados necesarios al API construida 
// para esta aplicacion
export default class Api {
    // En el constructor se define la url del api tomandola de la variable de entorno definida
    constructor() {
        this.api_url = process.env.REACT_APP_API_ENDPOINT;
    }

    // Se crea el cliente de axios para hacer las consultas
    init = () => {
        let headers = {
            Accept: "application/json",
        };

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 31000,
            headers: headers,
        });

        return this.client;
    };

    // Metodo que realiza la consulta de busqueda de items
    searchItems = (params) => {
        return new Promise(resolve => {
            this.init().get("/items", { params: params }).then(res => {
                resolve(res.data)
            }).catch(err =>{
                resolve({
                    statusCode: 404,
                    message: "Error en el API.\n" + err
                })
            });
        });
    };

    // Metodo que realiza la consulta del detalle de un producto por ID
    getItem = (params) => {
        return new Promise(resolve => {
            this.init().get(`/items/${params}`).then(res => {
                resolve(res.data)
            }).catch(err => {
                resolve({
                    statusCode: 404,
                    message: "Error en el API.\n" + err
                })
            });
        })
    };

    // Metodo que realiza la consulta de la ruta de navegacion (breadcrumb)
    getBreadcrumb = (params) => {
        return new Promise(resolve => {
            this.init().post('/items/breadcrumb', params).then(res => {
                resolve(res.data)
            }).catch(err => {
                resolve({
                    statusCode: 404,
                    message: "Error en el API.\n" + err
                })
            });
        })
    };
}