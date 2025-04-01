interface IReview {
    id: string;
    menu_item_id?: string;
    reviewer_name: string;
    rating: number;
    comment?: string;
    created_at: string;
}

interface IReviewCreate {
    menuItemId: string;
    reviewerName: string;
    rating: number;
    comment?: string;
}

export type { IReview, IReviewCreate };