import { create } from "zustand";
import { LIMIT_LISTS } from "../components/constants/constants";

interface IOrderSearch {
    inputSearch?: string;
    page: number;
    pageSize: string;
    sortBy: string;
    sortOrder: string;
    totalData: number;
    search: (input: string) => void;
    changePage: (input?: number) => void;
    changePageSize: (input?: string) => void;
    changeTotalData: (input?: number) => void;
}

const useOrderSearchStore = create<IOrderSearch>((set) => (
    {
        inputSearch: "",
        page: 1,
        pageSize: LIMIT_LISTS[1].label,
        sortBy: "name",
        sortOrder: "asc",
        totalData: 0,
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
    }
));

export default useOrderSearchStore;