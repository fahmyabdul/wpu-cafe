import { ReactNode, useEffect } from "react";
import TopNavbar from "../../ui/TopNavbar/TopNavbar";
import Footer from "../../ui/Footer";


interface PropTypes {
    title?: string;
    children: ReactNode;
}

const HomeLayout = (props: PropTypes) => {
    const {
        title,
        children,
    } = props;

    useEffect(() => {
        document.title = `WPU Cafe | ${title}`;
    }, [title]);

    return (
        <>
            <TopNavbar/>
            <div className="flex flex-col min-h-screen min-w-full items-center gap-5 mt-5">
                {children}
            </div>
            <Footer/>
        </>
    );
};

export default HomeLayout;