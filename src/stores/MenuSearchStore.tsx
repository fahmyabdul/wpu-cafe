import { create } from "zustand";

interface IMenuSearch {
    inputSearch?: string;
    search: (input: string) => void;
}

const useSearchStore = create<IMenuSearch>((set) => ( // set adalah setter untuk statenya
    {
        inputSearch: "",
        search: (input: string) => set(() => ({ inputSearch: input })),
    }
));

export default useSearchStore;