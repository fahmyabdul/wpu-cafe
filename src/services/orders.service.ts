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
    create: (payload: IOrderCreate, requestQuery?: AxiosRequestConfig) => {
        return instance.post(`${endpoint.ORDERS}`, payload, requestQuery);
    },
    update: (id: string, payload: IOrderUpdate, requestQuery?: AxiosRequestConfig) => {
        return instance.put(`${endpoint.ORDERS}/${id}`, payload, requestQuery);
    },
    delete: (id: string, requestQuery?: AxiosRequestConfig) => {
        return instance.delete(`${endpoint.ORDERS}/${id}`, requestQuery);
    },
}

export default ordersServices;
