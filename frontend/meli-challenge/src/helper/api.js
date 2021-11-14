
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
            });
        });
    };

    getItem = (param) => {
        return new Promise(resolve => {
            this.init().get(`/items/${param}`).then(res => {
                resolve(res.data)
            });
        });
    };
}