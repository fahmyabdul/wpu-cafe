import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IThemeSwitch {
    isDark: boolean;
    switchTheme: (isDark: boolean) => void;
}

const useThemeSwitchStore = create<IThemeSwitch>()(
    persist(
        (set) => ({
            isDark: false,
            switchTheme: (isDark: boolean) => set(() => ({ isDark: isDark })),
        }),
        {
            name: "theme",
            storage: createJSONStorage(()=> sessionStorage)
        }
    )
)

export default useThemeSwitchStore;