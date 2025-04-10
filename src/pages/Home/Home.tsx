import { Input } from "@heroui/react";
import FeaturedMenu from "../../components/ui/FeaturedMenu/FeaturedMenu";
import MainLayout from "../../components/layouts/MainLayout";
import useMenuStore from "../../stores/MenuStore";
import { FaMagnifyingGlass } from "react-icons/fa6";
import MenuCardList from "../../components/ui/MenuCardList";
import { useEffect } from "react";


const Home = () => {
    const { search, changePageSize } = useMenuStore();

    useEffect(()=>{
        changePageSize("12");
    },[changePageSize])
    
    return (
        <MainLayout title="">
            <>
            <div
                className="z-10 flex flex-col w-full gap-6 pl-6 pr-6 xl:pl-0 xl:pr-0 xl:w-9/12"
            >
                <div
                    className="flex items-center w-full"
                >
                    <h1
                        className="text-3xl font-bold text-teal-600 dark:text-white"
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
                    className="grid w-full grid-cols-2"
                >
                    <div className="flex items-center w-fit">
                        <h1
                            className="text-3xl font-bold text-teal-600 dark:text-white"
                        >
                            Our Menus
                        </h1>
                    </div>
                    <div className="flex items-center justify-end w-full">
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
                                <FaMagnifyingGlass className="flex-shrink-0 hidden mr-2 pointer-events-none text-default-400 sm:flex"/>
                            }
                            className="flex w-full xl:w-9/12"
                        />
                    </div>
                </div>
                <div
                    className="flex w-full"
                >
                    <MenuCardList 
                        isOrderable={false}
                        showSearch={false}
                        showCategoryFilter={true}
                        gridCols={3}
                        isFull
                    />
                </div>
            </div>
            </>
        </MainLayout>
    );
};

export default Home;