import { Button } from "@heroui/react";
import { ReactNode, useEffect } from "react";
import useThemeSwitchStore from "../../../stores/ThemeSwitchStore";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";


interface PropTypes {
    title?: string;
    children: ReactNode;
}

const AuthLayout = (props: PropTypes) => {
    const {
        title,
        children,
    } = props;

    useEffect(() => {
        document.title = `WPU Cafe | ${title}`;
    }, [title]);

    const { isDark, switchTheme } = useThemeSwitchStore();

    return (
        <div className="flex flex-col min-h-screen min-w-full items-center justify-center">
            <Button
                variant="flat" 
                aria-label="switch-theme" 
                isIconOnly
                onPress={() => switchTheme(!isDark)}
                className="absolute top-5 left-5"
            >
                {isDark ? (<HiOutlineSun size={20} />): (<HiOutlineMoon size={20} />)}
            </Button>
            {children}
        </div>
    );
};

export default AuthLayout;