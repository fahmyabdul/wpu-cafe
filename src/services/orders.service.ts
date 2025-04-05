import { AxiosRequestConfig } from "axios";
import { IOrderCreate, IOrderFilter, IOrderUpdate } from "../types/Orders";
import endpoint from "./endpoint.constant";
import instance from "./instance";
import { getLocalStorage } from "../utils/storage";

const ordersServices = {
    getAll: (requestParams?: IOrderFilter) => {
        return instance.get(`${endpoint.ORDERS}`, {
            params: requestParams,
            headers: {
                Authorization: `Bearer ${ getLocalStorage("accessToken").state.accessToken }`,
            }
        });
    },
    getById: (id: string, requestParams?: AxiosRequestConfig) => {
        return instance.get(`${endpoint.ORDERS}/${id}`, {
            params: requestParams,
            headers: {
                Authorization: `Bearer ${ getLocalStorage("accessToken").state.accessToken }`,
            }
        });
    },
    create: (payload: IOrderCreate, requestParams?: IOrderFilter) => {
        return instance.post(`${endpoint.ORDERS}`, payload, {
            params: requestParams,
            headers: {
                Authorization: `Bearer ${ getLocalStorage("accessToken").state.accessToken }`,
            }
        });
    },
    update: (id: string, payload: IOrderUpdate, requestParams?: IOrderFilter) => {
        return instance.put(`${endpoint.ORDERS}/${id}`, payload, {
            params: requestParams,
            headers: {
                Authorization: `Bearer ${ getLocalStorage("accessToken").state.accessToken }`,
            }
        });
    },
    delete: (id: string, requestParams?: IOrderFilter) => {
        return instance.delete(`${endpoint.ORDERS}/${id}`, {
            params: requestParams,
            headers: {
                Authorization: `Bearer ${ getLocalStorage("accessToken").state.accessToken }`,
            }
        });
    },
}

export default ordersServices;
