import { create } from "zustand";
import { LIMIT_LISTS } from "../components/constants/constants";
import { createJSONStorage, persist } from "zustand/middleware";

interface IOrderStore {
    inputSearch?: string;
    page: number;
    pageSize: string;
    sortBy: string;
    sortOrder: string;
    totalData: number;
    reloadOrder: boolean;
    search: (input: string) => void;
    changePage: (input?: number) => void;
    changePageSize: (input?: string) => void;
    changeTotalData: (input?: number) => void;
    doReloadOrder: () => void;
    deleteOrderStore: () => void;
}

const useOrderStore = create<IOrderStore>()(
    persist(
        (set) => ({
            inputSearch: "",
            page: 1,
            pageSize: LIMIT_LISTS[1].label,
            sortBy: "created_at",
            sortOrder: "desc",
            totalData: 0,
            reloadOrder: false,
            search: (input: string) => set(
                () => (
                    { 
                        inputSearch: input 
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
            }
        }),
        {
            name: "orderStore",
            storage: createJSONStorage(()=> sessionStorage),
            partialize: (state) => ({ totalData: state.totalData }),
        }
    ),
)

export default useOrderStore;