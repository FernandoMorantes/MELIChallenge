
import * as axios from "axios";

export default class Api {
    constructor() {
        this.api_url = process.env.REACT_APP_API_ENDPOINT;
    }

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