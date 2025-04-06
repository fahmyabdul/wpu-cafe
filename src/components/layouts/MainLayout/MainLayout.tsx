import { ReactNode, useEffect } from "react";
import TopNavbar from "../../ui/TopNavbar/TopNavbar";
import Footer from "../../ui/Footer";
import FloatingButton from "../../ui/FloatingButton";

interface PropTypes {
    title?: string;
    children: ReactNode;
}

const MainLayout = (props: PropTypes) => {
    const {
        title,
        children,
    } = props;

    useEffect(() => {
        if (title){
            document.title = `WPU Cafe | ${title}`;
        }
    }, [title]);

    return (
        <div className="flex flex-col min-h-screen min-w-full">
            <TopNavbar/>
            <div className="flex flex-col items-center mt-5 mb-5 lg:mt-8 lg:mb-8">
                {children}
            </div>
            <FloatingButton/>
            <Footer/>
        </div>
    );
};

export default MainLayout;