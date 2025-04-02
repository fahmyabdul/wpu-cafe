import { Card, CardBody, CardFooter, Image, Skeleton } from "@heroui/react";
import { IMenu } from "../../../types/Menu";
import menuServices from "../../../services/menu.service";
import { useQuery } from "@tanstack/react-query";
import useSearchStore from "../../../stores/MenuSearchStore";

const ListMenu = () => {
    // Using Zustand State
    const { inputSearch } = useSearchStore();
    
    let requestParams = {
        pageSize: 12,
        sortBy: "name",
        sortOrder: "asc"
    };

    const {
        data: menus,
        isLoading
    } = useQuery({
        queryKey: ["dataMenu", inputSearch],
        queryFn: async () => {
            
            if (inputSearch !== "") {
                requestParams = Object.assign(requestParams, {search: inputSearch});
            }

            const result = await menuServices.getAll({
                    params: requestParams,
                })
                .then((res) => res.data)
                .then((data) => data.data);

            return result;
        },
    });
    

    return (
        <div className="grid grid-cols-2 lg:grid-cols-6 w-full gap-4">
            {isLoading ? (
                <>
                {[...Array(6)].map((_,i)=>
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
                                <Image
                                    className="w-full object-cover h-[200px] rounded-b-none"
                                    radius="lg"
                                    shadow="sm"
                                    width="100%"
                                />
                            </Skeleton>
                        </CardBody>
                        <CardFooter
                            className="flex flex-col text-small justify-between"
                        >
                            <Skeleton>
                                <b>Name</b>
                            </Skeleton>
                            <Skeleton className="text-default-500 lg:mt-1 lg:h-4">
                                <p className="text-default-500">$0</p>
                            </Skeleton>
                        </CardFooter>
                    </Card>
                )
                )}
                </>
            ): ""}
            {menus && menus.map((item: IMenu)=>(
                <Card
                    key={item.id}
                    isPressable
                    shadow="none"
                    className="shadow-md rounded-xl"
                    // onPress={()=> console.log(`Pressed ${item.name}`)}
                >
                    <CardBody 
                        className="overflow-visible p-0"
                    >
                        <Image
                            alt={item.name}
                            aria-label={"menuimg-"+item.id}
                            className="w-full object-cover h-[200px] rounded-b-none"
                            radius="lg"
                            shadow="none"
                            src={item.image_url}
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter
                        className="flex flex-col text-small justify-between"
                    >
                        <p className="text-md">{item.name}</p>
                        <p className="text-teal-600 font-bold">${item.price}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default ListMenu;