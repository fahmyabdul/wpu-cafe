import { AxiosRequestConfig } from "axios";
import endpoint from "./endpoint.constant";
import instance from "./instance";

const menuServices = {
    getAll: (requestQuery?: AxiosRequestConfig) => {
        return instance.get(`${endpoint.MENU}`, requestQuery);
    },
    getById: (id: string) => {
        return instance.get(`${endpoint.MENU}/${id}`);
    }
}

export default menuServices;
