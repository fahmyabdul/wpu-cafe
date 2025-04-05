import { IMenu } from "./Menu";

interface IOrderCart {
    menuItemId?: string;
    menuItem?: IMenu;
    name?: string;
    quantity: number;
    price?: number;
    totalPrice?: number;
    notes?: string;
}

interface IOrder {
    id: string;
    customer_name: string;
    table_number: number;
    cart?: IOrderCart[];
    status: string;
    total: number;
    created_at: string;
    updated_at: string;
}

interface IOrderCreate {
    customerName: string;
    tableNumber: number;
    cart: IOrderCart[];
}

interface IOrderUpdate {
    status: string;
}

export type { IOrderCart, IOrder, IOrderCreate, IOrderUpdate };