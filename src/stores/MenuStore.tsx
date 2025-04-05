import { create } from "zustand";
import { LIMIT_LISTS } from "../constants/constants";

interface IMenuStore {
    inputSearch?: string;
    page: number;
    pageSize: string;
    sortBy: string;
    sortOrder: string;
    category: string;
    totalData: number;
    reload: boolean;
    search: (input: string) => void;
    changePage: (input?: number) => void;
    changePageSize: (input?: string) => void;
    changeCategory: (input?: string) => void;
    changeTotalData: (input?: number) => void;
    doReload: () => void;
}

const useMenuStore = create<IMenuStore>((set) => (
    {
        inputSearch: "",
        page: 1,
        pageSize: LIMIT_LISTS[0].label,
        sortBy: "name",
        sortOrder: "asc",
        category: "",
        totalData: 0,
        reload: false,
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
        changeCategory: (input?: string) => set(
            () => (
                {
                    category: input,
                }
            )
        ),
        changeTotalData: (input?: number) => set(
            () => ( {
                totalData: input,
            })
        ),
        doReload: () => set(
            (state) => ( {
                reload: !state.reload,
            })
        ),
    }
));

export default useMenuStore;