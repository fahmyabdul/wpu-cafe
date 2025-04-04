import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner, useDisclosure } from "@heroui/react";
import { Key, ReactNode, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/ui/DataTable";
import MainLayout from "../../components/layouts/MainLayout";
import { HiCheckBadge, HiEllipsisVertical, HiMiniFaceFrown, HiMiniPlusCircle, HiMiniTrash, HiOutlineEye } from "react-icons/hi2";
import { useQuery } from "@tanstack/react-query";
import ordersServices from "../../services/orders.service";
import useAuthStore from "../../stores/AuthStore";
import useOrderStore from "../../stores/OrderStore";
import { OrderView } from "./OrderView";

const COLUMN_LISTS_ORDER = [
    {name: "No", uid: "no"},
    {name: "Customer Name", uid: "customer_name"},
    {name: "Table", uid: "table_number"},
    {name: "Total", uid: "total"},
    {name: "Status", uid: "status"},
    {name: "Actions", uid: "actions"},
]

const Orders = () => {
    const navigate = useNavigate();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [viewId, setViewId] = useState("");

    // Using Zustand State
    const { 
        inputSearch,
        page,
        pageSize,
        sortBy,
        sortOrder,
        totalData,
        search,
        changePage,
        changePageSize,
        changeTotalData,
    } = useOrderStore();

    const { accessToken } = useAuthStore();
    
    let requestParams = {
        page: page,
        pageSize: pageSize,
        sortBy: sortBy,
        sortOrder: sortOrder
    };

    const {
        data: orders,
        isLoading
    } = useQuery({
        queryKey: ["dataOrder", inputSearch, requestParams],
        queryFn: async () => {
            if (inputSearch !== "") {
                requestParams = Object.assign(requestParams, {search: inputSearch});
            }

            const result = await ordersServices.getAll({
                    params: requestParams,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                .then((res) => res.data)
                .then((data) => {
                    changeTotalData(data.metadata.total)
                    
                    return data.data;
                })
                .catch(() => []);

            return result;
        },
    });
    
    const renderCell = useCallback(
        (index: number, order: Record<string, unknown>, columnKey: Key) => {
            const cellValue = order[columnKey as keyof typeof order];

            switch (columnKey) {
                case "no":
                    return (
                        <p>{index+1}</p>
                    )
                case "total":
                    return (
                        <p>${order.total as string}</p>
                    )
                case "actions":
                    return (
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <HiEllipsisVertical size={20} className="text-default-700"/>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem
                                    key="detail-orders" 
                                    // onPress={() => navigate("/orders/"+order.id)}
                                    onPress={()=>{
                                        setViewId(order.id as unknown as string);
                                        onOpen();
                                    }}
                                >
                                    <p className="flex items-center justify-start"><HiOutlineEye size={18} />&nbsp;View</p>
                                </DropdownItem>
                                {order.status === "COMPLETED" ? 
                                    (
                                        <DropdownItem 
                                            key="delete-orders"
                                            onPress={() => navigate("/orders/"+order.id+"/delete")}
                                        >
                                            <p className="flex items-center justify-start text-danger"><HiMiniTrash size={18} />&nbsp;Delete</p>
                                        </DropdownItem>
                                    )
                                    :
                                    (
                                        <DropdownItem 
                                            key="complete-orders" 
                                            onPress={() => navigate("/orders/"+order.id+"/complete")}
                                        >
                                            <p className="flex items-center justify-start text-teal-600 dark:text-teal-500"><HiCheckBadge size={18} />&nbsp;Complete</p>
                                        </DropdownItem>
                                    )
                                }
                            </DropdownMenu>
                        </Dropdown>
                    );
                default:
                    return cellValue as unknown as ReactNode;
            }
        },
        [navigate]
    );

    return (
        <MainLayout title="Orders">
            <OrderView id={viewId} isOpen={isOpen} onOpenChange={onOpenChange}/>
            <div className="flex flex-col gap-5 lg:gap-10 justify-center items-center w-full xl:w-8/12 px-5 xl:px-0">
                <h1
                        className="font-bold text-2xl bg-gradient-to-r bg-clip-text from-sky-600 to-teal-400 text-transparent text-left w-full"
                    >
                        Orders
                </h1>
                <DataTable
                    columns={COLUMN_LISTS_ORDER}
                    data={!isLoading ? orders : []}
                    emptyContent={
                        !isLoading ? 
                        (
                            <p className="flex items-center justify-center"><b>OH NO!!!</b>&nbsp;Nobody Order Our Product&nbsp;<HiMiniFaceFrown size={25} /></p>
                        ) 
                        :
                        (
                            <Spinner color="success" variant="wave" />
                        )
                    }
                    buttonTopContentLabel={
                        <>
                            <HiMiniPlusCircle size={20}/>Order
                        </>
                    }
                    onChangeSearch={(e) => { search(e.target.value)}}
                    onClearSearch={() => { search("")}}
                    onClickButtonTopContent={() => {}}
                    renderCell={renderCell}
                    limit={pageSize}
                    onChangeLimit={(e) => {
                        changePageSize(e.target.value as unknown as string);
                    }}
                    isLoading={isLoading}
                    currentPage={isLoading ? 1 : page}
                    onChangePage={(e) => { 
                        changePage(e as unknown as number)
                    }}
                    totalPages={ isLoading ? 1 :
                        Math.ceil(totalData/(pageSize as unknown as number))
                    }
                />
            </div>
        </MainLayout>
    );
}

export default Orders;