import axios, { AxiosInstance } from "axios";

const BASE_URL = "http://localhost:3000/api";

class HTTP {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json",
            }
        });
    }
}

const http = new HTTP().instance;
export default http;
