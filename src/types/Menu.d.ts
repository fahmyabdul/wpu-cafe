import { IReview } from "./Reviews";

interface IMenu {
    id: string;
    name: string;
    description?: string;
    price: number;
    image_url?: string;
    category: string;
    is_available: boolean;
    created_at: string;
}

interface IMenuReviews {
    items: IReview[];
    total: number;
    averageRating: number;
}

interface IMenuById {
    menuItem: IMenu;
    Reviews: IMenuReviews;
}

interface IMenuFilter {
    page?: number;
    pageSize?: string;
    sortBy?: string;
    sortOrder?: string;
    search?: string;
    category?: string;
}

export type { IMenu, IMenuById, IMenuFilter };