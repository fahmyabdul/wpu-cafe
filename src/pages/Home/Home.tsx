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
            <div
                className="flex flex-col w-full pl-6 pr-6 xl:pl-0 xl:pr-0 xl:w-8/12 gap-6"
            >
                <div
                    className="flex w-full items-center"
                >
                    <h1
                        className="font-bold text-3xl text-teal-600 dark:text-teal-500"
                    >
                        Featured
                    </h1>
                </div>
                <div
                    className="flex w-full"
                >
                    <FeaturedMenu/>
                </div>
                {/* <div className="grid grid-cols-6 w-full gap-10">
                    {MENU_CATEGORIES.map((item, index) => (
                        <Card key={index} isPressable shadow="sm" onPress={() => console.log("item pressed")} className="hover:bg-foreground-700 hover:text-white dark:border-1 dark:border-foreground-600 dark:bg-transparent dark:hover:bg-foreground-600 dark:hover:text-black">
                            <CardFooter className="text-small justify-center">
                                <b>{item}</b>
                            </CardFooter>
                        </Card>
                    ))}
                </div> */}
                <div
                    className="grid grid-cols-2 w-full"
                >
                    <div className="flex w-fit items-center">
                        <h1
                            className="font-bold text-3xl text-teal-600 dark:text-teal-500"
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
                    {/* <ListMenu/> */}
                    <MenuCardList 
                        isOrderable={false}
                        showSearch={false}
                        showCategoryFilter={true}
                        gridCols={3}
                        isFull
                    />
                </div>
            </div>
        </MainLayout>
    );
};

export default Home;