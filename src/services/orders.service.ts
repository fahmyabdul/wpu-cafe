import { AxiosRequestConfig } from "axios";
import { IOrderCreate, IOrderUpdate } from "../types/Orders";
import endpoint from "./endpoint.constant";
import instance from "./instance";

const ordersServices = {
    getAll: (requestQuery?: AxiosRequestConfig) => {
        return instance.get(`${endpoint.ORDERS}`, requestQuery);
    },
    getById: (id: string, requestQuery?: AxiosRequestConfig) => {
        return instance.get(`${endpoint.ORDERS}/${id}`, requestQuery);
    },
    create: (payload: IOrderCreate) => {
        return instance.post(`${endpoint.ORDERS}`, payload);
    },
    update: (payload: IOrderUpdate) => {
        return instance.put(`${endpoint.ORDERS}`, payload);
    },
    delete: (id: string) => {
        return instance.delete(`${endpoint.ORDERS}/${id}`);
    },
}

export default ordersServices;
