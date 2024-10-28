import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;

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
