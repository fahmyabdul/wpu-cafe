import { addToast, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Select, SelectItem, Spinner, useDisclosure } from "@heroui/react";
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
import { FaReceipt, FaRegEye, FaTrashCan } from "react-icons/fa6";
import OrderCreate from "./OrderCreate";
import { COLUMN_STATUS_LISTS, ORDER_COLUMN_LISTS, SORT_BY_LISTS, SORT_ORDER_LISTS } from "../../constants/orders";

const Orders = () => {
    const modalDetail = useDisclosure();
    const modalCreate = useDisclosure();
    const [viewId, setViewId] = useState("");

    // Using Zustand State
    const { 
        inputSearch,
        page,
        pageSize,
        status,
        sortBy,
        sortOrder,
        totalData,
        reloadOrder,
        search,
        changePage,
        changePageSize,
        changeStatus,
        changeSortBy,
        changeSortOrder,
        changeTotalData,
        doReloadOrder,
    } = useOrderStore();
    
    const requestParams = {
        search: inputSearch,
        page: page,
        pageSize: pageSize,
        status: status,
        sortBy: sortBy,
        sortOrder: sortOrder
    };

    const {
        data: orders,
        isFetching,
    } = useQuery({
        queryKey: ["dataOrder", requestParams, reloadOrder],
        queryFn: async () => {
            const result = await ordersServices.getAll(requestParams)
                .then((res) => res.data)
                .then((data) => {
                    changeTotalData(data.metadata.total)
                    
                    return data.data;
                })
                .catch(() => {});

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
                                        console.log("Order", order);
                                        if(order.id === "" || order.total === 0) {
                                            addToast({
                                                title: "Woopss something happens!",
                                                description: "Unable to view order...",
                                                timeout: 3000,
                                                shouldShowTimeoutProgress: true,
                                                color: "danger",
                                            });
                                        } else {
                                            setViewId(order.id as unknown as string);
                                            modalDetail.onOpen();
                                        }
                                    }}
                                    textValue="View"
                                >
                                    <p className="flex items-center justify-start"><FaRegEye size={16} />&nbsp;View</p>
                                </DropdownItem>
                                {order.status === "COMPLETED" ? 
                                    (
                                        <>
                                        <DropdownItem 
                                            key="delete-orders"
                                            onPress={() => {
                                                doDeleteOrder(order.id as unknown as string);
                                            }}
                                            textValue="Delete"
                                        >
                                            <p className="flex items-center justify-start text-danger"><FaTrashCan size={16} />&nbsp;Delete</p>
                                        </DropdownItem>
                                        <DropdownItem
                                            key="print-invoice"
                                            as={Link}
                                            href={`/orders/${order.id}/invoice`}
                                            target="_blank"
                                        >
                                            <p className="flex items-center justify-start text-primary"><FaReceipt size={16} />&nbsp;Print Invoice</p>
                                        </DropdownItem>
                                        </>
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
            <div className="flex flex-col items-center justify-center w-full gap-5 px-5 lg:gap-10 xl:w-9/12 xl:px-0">
                <h1
                        className="w-full text-3xl font-bold text-left text-teal-600 dark:text-white"
                    >
                        Orders
                </h1>
                <p className="mt-[-15px] lg:mt-[-35px] text-default-500 text-lg text-left w-full">Manage Customers Order</p>
                <DataTable
                    columns={ORDER_COLUMN_LISTS}
                    data={!isFetching && orders ? orders : []}
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
                    rightTopContent={
                        <>
                            <Button className="text-white bg-teal-600" onPress={
                                () => {
                                    modalCreate.onOpen();
                                }
                            }>
                                <HiMiniPlusCircle size={20}/>Order
                            </Button>
                        </>
                    }
                    columnFilterContent={
                        <div className="flex-row hidden gap-2 md:flex">
                            <Select
                                aria-label="datatable-status-filter"
                                className="min-w-[150px]"
                                startContent={<p className="text-small text-nowrap">Status:</p>}
                                selectionMode="single"
                                selectedKeys={[status as unknown as string]}
                                size="md"
                                onChange={(e) => {
                                    changePage(1);
                                    changeStatus(e.target.value as unknown as string)
                                }}
                            >
                                {COLUMN_STATUS_LISTS.map((item) => (
                                    <SelectItem
                                        key={item.value}
                                    >
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    }
                    bottomFilterContent={
                        <div className="flex-row hidden gap-2 lg:flex">
                            <Select
                                aria-label="datatable-sortby-filter"
                                className="min-w-[180px]"
                                startContent={<p className="text-small text-nowrap">Sort By:</p>}
                                selectionMode="single"
                                selectedKeys={[sortBy as unknown as string]}
                                size="md"
                                onChange={(e) => {
                                    changePage(1);
                                    changeSortBy(e.target.value as unknown as string)
                                }}
                            >
                                {SORT_BY_LISTS.map((item) => (
                                    <SelectItem
                                        key={item.value}
                                    >
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select
                                aria-label="datatable-sortorder-filter"
                                className="min-w-[180px]"
                                startContent={<p className="text-small text-nowrap">Order:</p>}
                                selectionMode="single"
                                selectedKeys={[sortOrder as unknown as string]}
                                size="md"
                                onChange={(e) => {
                                    changePage(1);
                                    changeSortOrder(e.target.value as unknown as string)
                                }}
                            >
                                {SORT_ORDER_LISTS.map((item) => (
                                    <SelectItem
                                        key={item.value}
                                    >
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    }
                    searchPlaceholder="Search by Customer Name"
                    onChangeSearch={(e) => { search(e.target.value)}}
                    onClearSearch={() => { search("")}}
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