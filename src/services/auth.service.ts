import { ILogin } from "../types/Auth";
import endpoint from "./endpoint.constant";
import instance from "./instance";

const authServices = {
    login: (payload: ILogin) => {
        return instance.post(`${endpoint.AUTH}/login`, payload);
    },
}

export default authServices;
