import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IAuth {
    accessToken: string;
    setAccessToken: (accessToken: string) => void;
    deleteAccessToken: () => void;
}

const useAuthStore = create<IAuth>()(
    persist(
        (set) => ({
            accessToken: "",
            setAccessToken: (accessToken: string) => set(() => ({ accessToken: accessToken })),
            deleteAccessToken: () => {
                useAuthStore.persist.clearStorage()
            }
        }),
        {
            name: "accessToken",
            storage: createJSONStorage(()=> sessionStorage)
        }
    )
)

export default useAuthStore;