import { Button, Card, CardBody, Image, Input, Pagination, Select, SelectItem, Skeleton } from "@heroui/react";
import { IMenu } from "../../../types/Menu";
import menuServices from "../../../services/menu.service";
import { useQuery } from "@tanstack/react-query";
import useMenuStore from "../../../stores/MenuStore";
import { LIMIT_LISTS, MENU_CATEGORIES } from "../../../constants/constants";
import { FaMagnifyingGlass } from "react-icons/fa6";
import useOrderStore from "../../../stores/OrderStore";
import { cn } from "../../../utils/cn";
import { HiMiniFaceFrown } from "react-icons/hi2";

interface PropTypes {
    isOrderable: boolean;
    showSearch: boolean;
    showCategoryFilter: boolean;
    gridCols: number;
    isFull: boolean;
}

const MenuCardList = (props: PropTypes) => {
    const {
        isOrderable,
        showSearch,
        showCategoryFilter,
        gridCols,
        isFull,
    } = props;

    // Using Zustand State
    const { 
        inputSearch,
        page,
        pageSize,
        totalData,
        sortBy,
        sortOrder,
        reload,
        category,
        search,
        changePage,
        changePageSize,
        changeCategory,
        changeTotalData,
    } = useMenuStore();
    
    let requestParams = {
        page: page,
        pageSize: pageSize,
        sortBy: sortBy,
        sortOrder: sortOrder,
        category: category,
    };

    const {
        data: menus,
        isFetching,
    } = useQuery({
        queryKey: ["dataMenu", inputSearch, requestParams, reload, totalData],
        queryFn: async () => {
            if (inputSearch !== "") {
                requestParams = Object.assign(requestParams, {search: inputSearch});
            }

            const result = await menuServices.getAll({
                    params: requestParams,
                })
                .then((res) => res.data)
                .then((data) => {
                    changeTotalData(0);
                    if (data.data.length > 0) {
                        changeTotalData(data.metadata.total);
                    }
                    return data.data;
                })
                .catch(() => {
                    changeTotalData(0);
                    return [];
                });

            return result;
        },
    });

    const orderState  = useOrderStore();    

    return (
        <div className={
                cn({
                    "w-full": isFull,
                })
            }>
            {showCategoryFilter &&
                <div className="flex flex-nowrap w-full overflow-x-auto mb-5 gap-2">
                    {MENU_CATEGORIES.map((item, index) => (
                        <div
                            key={"menucategory-"+index}
                        >
                            <Button 
                                key={index} 
                                variant={item.value === category ? "flat" : "ghost"}
                                onPress={() => {
                                    changePage(1);
                                    changeCategory(item.value);
                                }} 
                                className={cn("p-4 font-bold", {
                                    "bg-teal-600 text-white": item.value === category,
                                })}
                            >
                                {item.label}
                            </Button>
                        </div>
                    ))}
                </div>
            }
            {showSearch &&
                <div className="flex justify-end w-full items-center mb-5">
                    <Input
                        placeholder="Search Menu Name"
                        aria-label="input-search"
                        type="search"
                        isClearable
                        onClear={()=> {
                                search("");
                            }
                        }
                        onChange={(e)=> {
                                changePage(1);
                                search(e.target.value);
                            }
                        }
                        startContent={
                            <FaMagnifyingGlass className="text-default-400 pointer-events-none flex-shrink-0 mr-2 hidden sm:flex"/>
                        }
                        className="flex w-full"
                    />
                </div>
            }
            {
                !isFetching && totalData === 0 ? (
                    <p className="flex items-center justify-center text-foreground-500 pt-2 dark:text-white">
                        <b>OH NO!!!</b>&nbsp;No menu found&nbsp;<HiMiniFaceFrown size={25} />
                    </p>
                ): ""
            }
            <div
                className={cn(
                    "grid w-fill gap-4", 
                    {
                        "grid-cols-1 lg:grid-cols-2": gridCols === 2,
                        "grid-cols-2 lg:grid-cols-3": gridCols === 3,
                        "grid-cols-2 lg:grid-cols-4": gridCols === 4,
                    }
                )}
            >
                {isFetching ? (
                    <>
                    {[...Array(gridCols)].map((_,i)=>
                    (
                        <Card
                            key={`menu-${i}`}
                            shadow="none"
                            className="shadow-md rounded-xl"
                        >
                            <CardBody 
                                className="overflow-visible p-0"
                            >
                                <Skeleton>
                                    <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                        <div className="relative col-span-6 md:col-span-4">
                                            <Image
                                                alt="Item Image"
                                                className="object-cover h-[150px]"
                                                shadow="md"
                                                width="100%"
                                            />
                                        </div>
                                        <div className="flex flex-col col-span-6 md:col-span-8">
                                            <div className="flex justify-between items-start pl-2 pr-2 pb-2 lg:pb-0 lg:pl-0 lg:pr-0">
                                                <div className="flex flex-col gap-0">
                                                    <h3 className="text-foreground/90 text-md lg:text-lg font-bold">Item Name</h3>
                                                    <p className="text-foreground/80 text-sm lg:text-sm">Item Category</p>
                                                    <h1 className="text-large font-medium mt-2">Item Price</h1>
                                                    <div className="mt-2 grid grid-cols-2">
                                                        {isOrderable &&
                                                            <Button
                                                                className="bg-teal-600 text-white"
                                                            >
                                                                Order
                                                            </Button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Skeleton>
                            </CardBody>
                        </Card>
                    )
                    )}
                    </>
                ): ""}
                { !isFetching && (menus.map((item: IMenu)=>(
                    <Card
                        key={item.id}
                        shadow="none"
                        className="shadow-md rounded-xl"
                    >
                        <CardBody 
                            className="overflow-visible p-0"
                        >
                            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                <div className="relative col-span-6 md:col-span-4">
                                    <Image
                                        alt={item.name}
                                        aria-label={"menuimg-"+item.id}
                                        className="object-cover h-[150px]"
                                        shadow="md"
                                        src={item.image_url}
                                        width="100%"
                                    />
                                </div>
                                <div className="flex flex-col col-span-6 md:col-span-8">
                                    <div className="flex justify-between items-start pl-2 pr-2 pb-2 lg:pb-0 lg:pl-0 lg:pr-0">
                                        <div className="flex flex-col gap-0">
                                            <h3 className="text-foreground/90 text-md lg:text-lg font-bold">{item.name}</h3>
                                            <p className="text-foreground/80 text-sm lg:text-sm">{item.category}</p>
                                            <h1 className="text-large font-medium mt-2">${item.price}</h1>
                                            <div className="mt-2 grid grid-cols-2">
                                                {isOrderable &&
                                                    <Button
                                                        className="bg-teal-600 text-white"
                                                        onPress={ 
                                                            () => {
                                                                orderState.addToCart("increment", item.id, item.name, item.price)
                                                            }
                                                        }
                                                    >
                                                        Order
                                                    </Button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                )))}
            </div>
            <div className="flex items-center justify-center px-2 py-2 lg:justify-between mt-5">
                <Select
                    aria-label="datatable-select"
                    className="hidden max-w-36 lg:block"
                    size="md"
                    selectedKeys={[pageSize]}
                    selectionMode="single"
                    onChange={(e) => {
                        changePage(1);
                        changePageSize(e.target.value as unknown as string);
                    }}
                    startContent={<p className="text-small">Show:</p>}
                >
                    {LIMIT_LISTS.map((item) => (
                        <SelectItem
                            key={item.value}
                        >
                            {item.label}
                        </SelectItem>
                    ))}
                </Select>
                <Pagination
                    aria-label="datatable-pagination"
                    isCompact 
                    showControls 
                    page={isFetching ? 1 : page} 
                    total={isFetching ? 1 :
                        Math.ceil(totalData/(pageSize as unknown as number))
                    }
                    onChange={(e)=> {
                        changePage(e as unknown as number)
                    }}
                    classNames={{
                        wrapper: "gap-0 overflow-visible h-8 rounded",
                        cursor:
                            "bg-teal-600 text-white font-bold",
                    }}
                />
            </div>
        </div>
    );
};

export default MenuCardList;