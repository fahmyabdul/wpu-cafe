import { Button, Card, CardBody, CardFooter, Chip, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import ordersServices from "../../services/orders.service";
import useAuthStore from "../../stores/AuthStore";
import CustomSpinner from "../../components/ui/CustomSpinner";
import { IOrderCart } from "../../types/Orders";
import { HiCheckBadge, HiMiniTrash, HiOutlineEye } from "react-icons/hi2";
import { cn } from "../../utils/cn";
import DateReformat from "../../components/ui/DateReformat";
import useOrderStore from "../../stores/OrderStore";

interface PropTypes {
    id: string,
    isOpen: boolean;
    onOpenChange: () => void;
}

export const OrderView = (props: PropTypes) => {
    const {
        id,
        isOpen,
        onOpenChange,
    } = props;

    const { accessToken } = useAuthStore();
    const { 
        reloadOrder,
        doReloadOrder,
    } = useOrderStore();

    const {
        data: orderDetail,
        isLoading
    } = useQuery({
        queryKey: [id,reloadOrder],
        queryFn: async () => {
            if (!id){
                return [];
            }
            const result = await ordersServices.getById(id,{
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                .then((res) => res.data)
                .then((data) => data)
                .catch(() => []);

            return result;
        },
    });

    const doCompleteOrder = async (id: string) => {
        await ordersServices.update(
            id, 
            {
                status: "COMPLETED"
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        )
        .then(() => {
            doReloadOrder();
        });
    };

    const doDeleteOrder = async(id: string) => {
        await ordersServices.delete(
            id,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        )
        .then(() => {
            doReloadOrder();
        });
    }
    
    return (
        <div className="min-w-full">
            <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                className="xl:min-w-[800px]"
                scrollBehavior="outside"
            >
                <ModalContent>
                    {isLoading ? 
                        (
                            <div className="flex h-full w-full items-center justify-center">
                                <CustomSpinner width={150}/>
                            </div>
                        )
                        :
                        (
                            (onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">
                                        <p className="flex items-center justify-start text-lg xl:text-xl">
                                            <HiOutlineEye className="mr-2"/>Order Detail
                                        </p>
                                    </ModalHeader>
                                        <ModalBody className="flex flex-col text-md">
                                            <div className="flex flex-col gap-3">
                                                <div>
                                                    <h1 className="text-default-500">Order ID</h1>
                                                    <p className="font-bold">{orderDetail.id}</p>
                                                </div>
                                                <div>
                                                    <h1 className="text-default-500">Customer Name</h1>
                                                    <p className="font-bold">{orderDetail.customer_name}</p>
                                                </div>
                                                <div>
                                                    <h1 className="text-default-500">Table Number</h1>
                                                    <p className="font-bold">{orderDetail.table_number}</p>
                                                </div>
                                                <div>
                                                    <h1 className="text-default-500">Status</h1>
                                                    <Chip
                                                        className={cn("text-white",{
                                                            "bg-teal-600": orderDetail.status === "COMPLETED",
                                                            "bg-warning-500": orderDetail.status === "PROCESSING"
                                                        })}
                                                    >
                                                        {orderDetail.status}
                                                    </Chip>
                                                </div>
                                                <div>
                                                    <h1 className="text-default-500">Total</h1>
                                                    <p className="font-bold">${orderDetail.total}</p>
                                                </div>
                                                <div>
                                                    <h1 className="text-default-500">Ordered On</h1>
                                                    <p className="font-bold">
                                                        <DateReformat inputDate={orderDetail.created_at} toFormat="MMMM do, yyyy hh:mm a"/>
                                                    </p>
                                                </div>
                                            </div>
                                            <hr className="mt-3"/>
                                            <div>
                                                <h1 className="font-bold text-lg mb-4">Ordered Items</h1>
                                                <div className="grid grid-cols-2 lg:grid-cols-4 grid-flow-row gap-4">
                                                    {orderDetail.cart.map((item: IOrderCart, index:number) => (
                                                        <Card 
                                                            key={index} 
                                                            isPressable 
                                                            shadow="sm" 
                                                            className="dark:bg-gray-800"
                                                        >
                                                            <CardBody className="overflow-visible p-0">
                                                                <Image
                                                                    alt={item.menuItem?.name}
                                                                    className="w-full object-cover h-[140px] rounded-b-none"
                                                                    radius="lg"
                                                                    shadow="sm"
                                                                    src={item.menuItem?.image_url}
                                                                    width="100%"
                                                                />
                                                            </CardBody>
                                                            <CardFooter className="flex flex-col text-sm justify-between">
                                                                <b>{item.menuItem?.name}</b>
                                                                <p className="text-default-500">{item.quantity} x ${item.menuItem?.price}</p>
                                                                <p className="text-default-600 font-medium">${item.quantity * (item.menuItem?.price === undefined ? 0 : item.menuItem?.price as unknown as number)}</p>
                                                            </CardFooter>
                                                        </Card>
                                                    ))}
                                                </div>
                                            </div>
                                        </ModalBody>
                                    <ModalFooter className="mt-2">
                                        {orderDetail.status === "COMPLETED" ? 
                                        (
                                            <Button 
                                                color="primary" 
                                                onPress={() => {
                                                    doDeleteOrder(orderDetail.id);
                                                    onClose();
                                                }}
                                                className="bg-danger gap-2"
                                                size="lg"
                                                fullWidth
                                            >
                                                <HiMiniTrash size={22} />Delete
                                            </Button>
                                        )
                                        :
                                        (
                                            <Button 
                                                color="primary" 
                                                onPress={() => {
                                                    doCompleteOrder(orderDetail.id);
                                                    onClose();
                                                }}
                                                className="bg-teal-600 gap-2"
                                                size="lg"
                                                fullWidth
                                            >
                                                <HiCheckBadge size={22} />Make Complete
                                            </Button>
                                        )}
                                    </ModalFooter>
                                </>
                            )
                        )
                    }
                </ModalContent>
            </Modal>
        </div>
    );
}