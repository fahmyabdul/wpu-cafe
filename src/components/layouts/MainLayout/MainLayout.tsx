import { ReactNode, useEffect } from "react";
import TopNavbar from "../../ui/TopNavbar/TopNavbar";
import Footer from "../../ui/Footer";
import FloatingButton from "../../ui/FloatingButton";

import { Image } from "@heroui/react";
import useThemeSwitchStore from "../../../stores/ThemeSwitchStore";

import bgCafeLeftLight from "../../../assets/cafe-left-teal.png";
import bgCafeLeftDark from "../../../assets/cafe-left-d.png";
import bgCafeRightLight from "../../../assets/cafe-right-teal.png";
import bgCafeRightDark from "../../../assets/cafe-right-d.png";

interface PropTypes {
    title?: string;
    children: ReactNode;
}

const MainLayout = (props: PropTypes) => {
    const {
        title,
        children,
    } = props;
    const { isDark } = useThemeSwitchStore();

    useEffect(() => {
        if (title){
            document.title = `WPU Cafe | ${title}`;
        }
    }, [title]);

    return (
        <div className="flex flex-col min-w-full min-h-screen">
            <TopNavbar/>
            <>
            <Image
                    src={isDark ? bgCafeLeftDark : bgCafeLeftLight}
                    width="11%"
                    className="fixed z-0 hidden -right-3 bottom-0 xl:flex scale-x-[-1]"
            />
            <Image
                    src={isDark ? bgCafeRightDark : bgCafeRightLight}
                    width="9%"
                    className="fixed z-0 hidden -left-0 -bottom-1 xl:flex scale-x-[-1]"
            />
            </>
            <div className="z-10 flex flex-col items-center mt-5 mb-5 lg:mt-8 lg:mb-8">
                {children}
            </div>
            <FloatingButton/>
            <Footer/>
        </div>
    );
};

export default MainLayout;