import { addToast, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner, useDisclosure } from "@heroui/react";
import { Key, ReactNode, useCallback, useState } from "react";
import { HiCheckBadge, HiEllipsisVertical, HiMiniFaceFrown, HiMiniPlusCircle } from "react-icons/hi2";
import { useQuery } from "@tanstack/react-query";
import ordersServices from "../../services/orders.service";
import useOrderStore from "../../stores/OrderStore";
import MainLayout from "../../components/layouts/MainLayout";
import DataTable from "../../components/ui/DataTable";
import { OrderView } from "./OrderView";
import DateReformat from "../../components/ui/DateReformat";
import { cn } from "../../utils/cn";
import { FaRegEye, FaTrashCan } from "react-icons/fa6";
import OrderCreate from "./OrderCreate";

const COLUMN_LISTS_ORDER = [
    {name: "No", uid: "no"},
    {name: "Customer Name", uid: "customer_name"},
    {name: "Table", uid: "table_number"},
    {name: "Total", uid: "total"},
    {name: "Status", uid: "status"},
    {name: "Ordered At", uid: "created_at"},
    {name: "Actions", uid: "actions"},
]

const Orders = () => {
    const modalDetail = useDisclosure();
    const modalCreate = useDisclosure();
    const [viewId, setViewId] = useState("");

    // Using Zustand State
    const { 
        inputSearch,
        page,
        pageSize,
        sortBy,
        sortOrder,
        totalData,
        reloadOrder,
        search,
        changePage,
        changePageSize,
        changeTotalData,
        doReloadOrder,
    } = useOrderStore();
    
    let requestParams = {
        page: page,
        pageSize: pageSize,
        sortBy: sortBy,
        sortOrder: sortOrder
    };

    const {
        data: orders,
        isFetching,
    } = useQuery({
        queryKey: ["dataOrder", inputSearch, requestParams, reloadOrder],
        queryFn: async () => {
            if (inputSearch !== "") {
                requestParams = Object.assign(requestParams, {search: inputSearch});
            }

            const result = await ordersServices.getAll(requestParams)
                .then((res) => res.data)
                .then((data) => {
                    changeTotalData(data.metadata.total)
                    
                    return data.data;
                })
                .catch(() => []);

            return result;
        },
    });

    const doCompleteOrder = useCallback(async (id: string) => {
        await ordersServices.update(
            id, 
            {
                status: "COMPLETED"
            },
        )
        .then(() => {
            addToast({
                title: "Success!",
                description: "Customer's order has been completed...",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                color: "success",
            });
            doReloadOrder();
        }).catch(()=>{
            addToast({
                title: "Woopss something happens!",
                description: "Unable to complete order...",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                color: "danger",
            });
            doReloadOrder();
        });
    },[doReloadOrder]);

    const doDeleteOrder = useCallback(async(id: string) => {
        await ordersServices.delete(id)
        .then(() => {
            addToast({
                title: "Success!",
                description: "Customer's order has been deleted...",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                color: "success",
            });
            doReloadOrder();
        }).catch(()=>{
            addToast({
                title: "Woopss something happens!",
                description: "Unable to delete order...",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                color: "danger",
            });
            doReloadOrder();
        });
    },[doReloadOrder]);
    
    const renderCell = useCallback(
        (index: number, order: Record<string, unknown>, columnKey: Key) => {
            const cellValue = order[columnKey as keyof typeof order];

            switch (columnKey) {
                case "no":
                    return (
                        <p>{index+1}</p>
                    );
                case "total":
                    return (
                        <p>${order.total as string}</p>
                    );
                case "status":
                    return (
                        <Chip
                            className={cn("text-white",{
                                "bg-teal-600": order.status === "COMPLETED",
                                "bg-warning-500": order.status === "PROCESSING"
                            })}
                        >
                            {order.status as string}
                        </Chip>
                    )
                case "created_at":
                    return (
                        <DateReformat 
                            inputDate={order.created_at as string} 
                            toFormat="MMMM do, yyyy hh:mm a"
                        />
                    );
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
                                    onPress={()=>{
                                        setViewId(order.id as unknown as string);
                                        modalDetail.onOpen();
                                    }}
                                    textValue="View"
                                >
                                    <p className="flex items-center justify-start"><FaRegEye size={16} />&nbsp;View</p>
                                </DropdownItem>
                                {order.status === "COMPLETED" ? 
                                    (
                                        <DropdownItem 
                                            key="delete-orders"
                                            onPress={() => {
                                                doDeleteOrder(order.id as unknown as string);
                                            }}
                                            textValue="Delete"
                                        >
                                            <p className="flex items-center justify-start text-danger"><FaTrashCan size={16} />&nbsp;Delete</p>
                                        </DropdownItem>
                                    )
                                    :
                                    (
                                        <DropdownItem 
                                            key="complete-orders" 
                                            onPress={() => {
                                                doCompleteOrder(order.id as unknown as string);
                                            }}
                                            textValue="Complete"
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
        }, [doCompleteOrder, doDeleteOrder, modalDetail]
    );

    return (
        <MainLayout title="Orders">
            <OrderView id={viewId} isOpen={modalDetail.isOpen} onOpenChange={modalDetail.onOpenChange}/>
            <OrderCreate isOpen={modalCreate.isOpen} onOpenChange={modalCreate.onOpenChange}/>
            <div className="flex flex-col gap-5 lg:gap-10 justify-center items-center w-full xl:w-9/12 px-5 xl:px-0">
                <h1
                        className="font-bold text-3xl text-teal-600 text-left w-full"
                    >
                        Orders
                </h1>
                <p className="mt-[-15px] lg:mt-[-35px] text-default-500 text-lg text-left w-full">Manage Customers Order</p>
                <DataTable
                    columns={COLUMN_LISTS_ORDER}
                    data={!isFetching ? orders : []}
                    emptyContent={
                        !isFetching ? 
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
                    searchPlaceholder="Search by Customer Name"
                    onChangeSearch={(e) => { search(e.target.value)}}
                    onClearSearch={() => { search("")}}
                    onClickButtonTopContent={() => {
                        modalCreate.onOpen();
                    }}
                    renderCell={renderCell}
                    limit={pageSize}
                    onChangeLimit={(e) => {
                        changePage(1);
                        changePageSize(e.target.value as unknown as string);
                    }}
                    isLoading={isFetching}
                    currentPage={isFetching ? 1 : page}
                    onChangePage={(e) => { 
                        changePage(e as unknown as number)
                    }}
                    totalPages={ isFetching ? 1 :
                        Math.ceil(totalData/(pageSize as unknown as number))
                    }
                />
            </div>
        </MainLayout>
    );
}

export default Orders;