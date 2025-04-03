import { Button, Input } from "@heroui/react";
import { HiOutlineEye } from "react-icons/hi2";
import ListMenu from "../../components/ui/ListMenu";
import FeaturedMenu from "../../components/ui/FeaturedMenu/FeaturedMenu";
import MainLayout from "../../components/layouts/MainLayout";
import useSearchStore from "../../stores/MenuSearchStore";
import { FaMagnifyingGlass } from "react-icons/fa6";


const Home = () => {
    const { search } = useSearchStore();

    return (
        <MainLayout title="Beranda">
            <div
                className="flex flex-col w-full pl-6 pr-6 xl:pl-0 xl:pr-0 xl:w-8/12 gap-6"
            >
                {/* <div
                    className="flex w-full items-center justify-center p-5"
                >
                    <h1
                        className="font-bold text-xl text-teal-600"
                    >
                        Welcome to WPU Cafe!!!
                    </h1>
                </div> */}
                <div
                    className="flex w-full items-center"
                >
                    <h1
                        className="font-bold text-2xl bg-gradient-to-r bg-clip-text from-sky-600 to-teal-400 text-transparent"
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
                    className="grid grid-cols-2 w-full"
                >
                    <div className="flex w-fit items-center">
                        <h1
                            className="font-bold text-2xl bg-gradient-to-r bg-clip-text from-sky-600 to-teal-400 text-transparent"
                        >
                            Our Menus
                        </h1>
                    </div>
                    <div className="flex justify-end w-full items-center">
                        <Input
                            placeholder="Search in WPU Cafe"
                            aria-label="input-search"
                            type="search"
                            isClearable
                            onClear={()=> {
                                search("");
                                }
                            }
                            onChange={(e)=> {
                                    search(e.target.value);
                                }
                            }
                            startContent={
                                <FaMagnifyingGlass className="text-default-400 pointer-events-none flex-shrink-0 mr-2 hidden sm:flex"/>
                            }
                            className="flex w-full xl:w-9/12"
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
                    <Button color="success" variant="solid" className="w-full p-5 xl:p-7 text-white xl:text-lg">
                    <HiOutlineEye size={25} />See Everything We Had To Offer
                    </Button>
                </div>
            </div>
        </MainLayout>
    );
};

export default Home;