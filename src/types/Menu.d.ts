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

export type { IMenu, IMenuById };