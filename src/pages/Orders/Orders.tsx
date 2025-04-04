import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from "@heroui/react";
import { Key, ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/ui/DataTable";
import MainLayout from "../../components/layouts/MainLayout";
import { HiEllipsisVertical, HiMiniFaceFrown, HiMiniPlusCircle } from "react-icons/hi2";
import { useQuery } from "@tanstack/react-query";
import ordersServices from "../../services/orders.service";
import useAuthStore from "../../stores/AuthStore";
import useOrderSearchStore from "../../stores/OrderSearchStore";

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
    } = useOrderSearchStore();

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
                    return(
                        <p>{index+1}</p>
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
                                    onPress={() => navigate(`/orders/${order.id}`)}
                                >
                                    View
                                </DropdownItem>
                                <DropdownItem 
                                    key="delete-orders" 
                                    className="text-teal-600"
                                >
                                    Delete
                                </DropdownItem>
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
                        !isLoading ? <p className="flex items-center justify-center"><b>OH NO!!!</b>&nbsp;Nobody Order Our Product&nbsp;<HiMiniFaceFrown size={25} /></p> : <Spinner color="success" />
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