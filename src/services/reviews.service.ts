import { IReviewCreate } from "../types/Reviews";
import endpoint from "./endpoint.constant";
import instance from "./instance";

const reviewsService = {
    getAll: () => {
        return instance.get(`${endpoint.REVIEWS}`);
    },
    create: (payload: IReviewCreate) => {
        return instance.post(`${endpoint.REVIEWS}`, payload);
    },
}

export default reviewsService;
