import { create } from "zustand";

interface IThemeSwitch {
    isDark: boolean;
    switchTheme: (isDark: boolean) => void;
}

const useThemeSwitchStore = create<IThemeSwitch>((set) => (
    {
        isDark: false,
        switchTheme: (isDark: boolean) => set(() => ({ isDark: isDark })),
    }
));

export default useThemeSwitchStore;