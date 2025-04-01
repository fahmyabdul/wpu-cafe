import { Card, CardBody, CardFooter, Image } from "@heroui/react";
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
        <div className="grid grid-cols-6 gap-4 w-full">
        {isLoading? "Loading....": ""}
        {menus && menus.map((item: IMenu)=>(
            <Card
                key={item.id}
                isPressable
                shadow="sm"
                onPress={()=> console.log(`Pressed ${item.name}`)}
            >
                <CardBody 
                    className="overflow-visible p-0"
                >
                    <Image
                        alt={item.name}
                        className="w-full object-cover h-[200px]"
                        radius="lg"
                        shadow="sm"
                        src={item.image_url}
                        width="100%"
                    />
                </CardBody>
                <CardFooter
                    className="flex flex-col text-small justify-between"
                >
                    <b>{item.name}</b>
                    <p className="text-default-500">${item.price}</p>
                </CardFooter>
            </Card>
        ))}
        </div>
    );
};

export default ListMenu;