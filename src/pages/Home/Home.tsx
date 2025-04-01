import { Button } from "@heroui/react";
import HomeLayout from "../../components/layouts/HomeLayout/HomeLayout";
import { HiShoppingCart } from "react-icons/hi2";
import ListMenu from "../../components/ui/ListMenu";
import FeaturedMenu from "../../components/ui/FeaturedMenu/FeaturedMenu";


const Home = () => {

    return (
        <HomeLayout title="Beranda">
            <h1
                className="font-bold"
            >
                Featured
            </h1>
            <FeaturedMenu/>
            <h1
                className="font-bold"
            >
                Our Menus
            </h1>
            <div>
                <ListMenu/>
            </div>
            <div>
                <Button color="success" className="text-white">
                    <HiShoppingCart/>Order Now
                </Button>
            </div>
        </HomeLayout>
    );
};

export default Home;