import { create } from "zustand";
import { LIMIT_LISTS } from "../constants/constants";
import { createJSONStorage, persist } from "zustand/middleware";
import { IOrderCart } from "../types/Orders";

interface IOrderStore {
    inputSearch?: string;
    page: number;
    pageSize: string;
    status?: string;
    sortBy: string;
    sortOrder: string;
    totalData: number;
    reloadOrder: boolean;
    carts: IOrderCart[];
    grandTotal: number;
    search: (input: string) => void;
    changeStatus: (input: string) => void;
    changeSortBy: (input?: string) => void;
    changeSortOrder: (input?: string) => void;
    changePage: (input?: number) => void;
    changePageSize: (input?: string) => void;
    changeTotalData: (input?: number) => void;
    doReloadOrder: () => void;
    deleteOrderStore: () => void;
    addToCart: (type: string, id: string, name: string, price: number) => void;
    addNoteToCarItem: (id: string, notes: string) => void;
    clearCart: () => void;
}

const useOrderStore = create<IOrderStore>()(
    persist(
        (set) => ({
            inputSearch: "",
            page: 1,
            pageSize: LIMIT_LISTS[0].label,
            status: "",
            sortBy: "created_at",
            sortOrder: "desc",
            totalData: 0,
            reloadOrder: false,
            carts: [],
            grandTotal: 0,
            search: (input: string) => set(
                () => (
                    { 
                        inputSearch: input 
                    }
                )
            ),
            changeStatus: (input: string) => set(
                () => (
                    { 
                        status: input 
                    }
                )
            ),
            changeSortBy: (input?: string) => set(
                () => (
                    { 
                        sortBy: input 
                    }
                )
            ),
            changeSortOrder: (input?: string) => set(
                () => (
                    { 
                        sortOrder: input 
                    }
                )
            ),
            changePage: (input?: number) => set(
                (state) => ( {
                    page: input ? input : state.page,
                })
            ),
            changePageSize: (input?: string) => set(
                (state) => ( {
                    pageSize: input ? input : state.pageSize,
                })
            ),
            changeTotalData: (input?: number) => set(
                (state) => ( {
                    totalData: input ? input : state.totalData,
                })
            ),
            doReloadOrder: () => set(
                (state) => ( {
                    reloadOrder: !state.reloadOrder,
                })
            ),
            deleteOrderStore: () => {
                useOrderStore.persist.clearStorage()
            },
            addToCart: (type: string, id: string, name: string, price: number) => set(
                (state) => {
                    const itemExist = state.carts.find((item: IOrderCart) => item.menuItemId == id);

                    switch (type) {
                        case "increment":
                            if(itemExist) {
                                state.grandTotal += price;
                                state.carts = state.carts.map((item: IOrderCart) => {
                                    const quantity = item.quantity + 1;
                                    const totalPrice = quantity * price;

                                    return item.menuItemId === id ? {...item, quantity, price, totalPrice } : item
                                });
                            } else {
                                state.carts = [...state.carts, {menuItemId: id, name, quantity: 1, price, totalPrice: price }];
                                state.grandTotal += price;
                            }
                            break;
                        case "decrement":
                            if (itemExist && itemExist.quantity <= 1) {
                                state.grandTotal -= itemExist.price as unknown as number;
                                state.carts = state.carts.filter((item: IOrderCart) => item.menuItemId !== id);
                            } else {
                                state.carts = state.carts.map((item: IOrderCart) => {
                                    if (item.menuItemId === id) {
                                        const quantity = item.quantity - 1;
                                        const totalPrice = quantity * (item.price as unknown as number);
                                        state.grandTotal -= item.price as unknown as number;

                                        return {...item, quantity, totalPrice };
                                    }

                                    return item;
                                });
                            }
                            break;
                    }

                    return {
                        carts: state.carts,
                        grandTotal: state.grandTotal,
                    };
                }
            ),
            addNoteToCarItem: (id: string, notes: string) => set(
                (state) => {
                    const itemExist = state.carts.find((item: IOrderCart) => item.menuItemId == id);
                    
                    if (itemExist) {
                        state.carts = state.carts.map((item: IOrderCart) => {
                            return item.menuItemId === id ? {...item, notes } : item
                        });
                    }

                    return {
                        carts: state.carts,
                    }
                }
            ),
            clearCart: () => set({
                carts: [],
                grandTotal: 0,
            })
        }),
        {
            name: "orderStore",
            storage: createJSONStorage(()=> sessionStorage),
            partialize: (state) => ({ totalData: state.totalData }),
        }
    ),
)

export default useOrderStore;