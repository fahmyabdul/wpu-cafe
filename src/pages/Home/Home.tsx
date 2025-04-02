import { Button, Input } from "@heroui/react";
import { HiShoppingCart } from "react-icons/hi2";
import ListMenu from "../../components/ui/ListMenu";
import FeaturedMenu from "../../components/ui/FeaturedMenu/FeaturedMenu";
import MainLayout from "../../components/layouts/MainLayout/MainLayout";
import useSearchStore from "../../stores/MenuSearchStore";


const Home = () => {
    const { search } = useSearchStore();

    return (
        <MainLayout title="Beranda">
            <div
                className="flex flex-col w-full pl-6 pr-6 lg:pl-0 lg:pr-0 lg:w-8/12 gap-6"
            >
                <div
                    className="flex w-full items-center justify-center p-5"
                >
                    <h1
                        className="font-bold text-xl text-teal-600"
                    >
                        Welcome to WPU Cafe!!!
                    </h1>
                </div>
                <div
                    className="flex w-full"
                >
                    <h1
                        className="font-bold text-xl text-teal-600"
                    >
                        Featured
                    </h1>
                </div>
                <div
                    className="flex w-full"
                >
                    <FeaturedMenu/>
                </div>
                <div
                    className="grid grid-cols-2 w-full align-middle"
                >
                    <h1
                        className="font-bold text-xl text-teal-600"
                    >
                        Our Menus
                    </h1>
                    <div className="flex justify-end">
                        <Input
                            placeholder="Cari di WPU Cafe"
                            aria-label="input-search"
                            width={100}
                            onChange={(e)=> {
                                    search(e.target.value);
                                }
                            }
                            className="flext lg:w-9/12"
                        />
                    </div>
                </div>
                <div
                    className="flex w-full"
                >
                    <ListMenu/>
                </div>
                <div
                    className="flex w-full"
                >
                    <Button color="success" className="w-full p-5 lg:p-7 text-white lg:text-lg">
                        Order Now <HiShoppingCart className="lg:text-2xl"/>
                    </Button>
                </div>
            </div>
        </MainLayout>
    );
};

export default Home;