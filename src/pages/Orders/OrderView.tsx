import { addToast, Button, Card, CardBody, Chip, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import ordersServices from "../../services/orders.service";
import CustomSpinner from "../../components/ui/CustomSpinner";
import { IOrderCart } from "../../types/Orders";
import { HiCheckBadge } from "react-icons/hi2";
import { cn } from "../../utils/cn";
import DateReformat from "../../components/ui/DateReformat";
import useOrderStore from "../../stores/OrderStore";
import Stamp from "../../components/ui/Stamp";
import { FaReceipt, FaRegEye, FaTrashCan } from "react-icons/fa6";

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
            const result = await ordersServices.getById(id)
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
    };

    const doDeleteOrder = async(id: string) => {
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
    };
    
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
                                            <FaRegEye className="mr-2"/>Order Detail
                                        </p>
                                    </ModalHeader>
                                    <ModalBody className="flex flex-col text-md">
                                        <div className="relative hidden xl:flex">
                                            {orderDetail.status === "COMPLETED" &&
                                                (
                                                    <Stamp classes="absolute top-10 right-10 -rotate-6 rounded-xl border-teal-600 border-[8px] text-center p-2">
                                                        <HiCheckBadge 
                                                            className="text-teal-600 text-9xl mb-[-10px]"
                                                        />
                                                        <span className="text-teal-600 text-2xl font-bold">Completed</span>
                                                    </Stamp>
                                                )
                                            }
                                        </div>
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
                                                <h1 className="text-default-500">Total</h1>
                                                <p className="font-bold">${orderDetail.total}</p>
                                            </div>
                                            <div>
                                                <h1 className="text-default-500">Ordered On</h1>
                                                <p className="font-bold">
                                                    <DateReformat inputDate={orderDetail.created_at} toFormat="MMMM do, yyyy hh:mm a"/>
                                                </p>
                                            </div>
                                            <div>
                                                <h1 className="text-default-500 mb-1">Status</h1>
                                                <Chip
                                                    className={cn("text-white",{
                                                        "bg-teal-600": orderDetail.status === "COMPLETED",
                                                        "bg-warning-500": orderDetail.status === "PROCESSING"
                                                    })}
                                                >
                                                    {orderDetail.status}
                                                </Chip>
                                            </div>
                                        </div>
                                        <hr className="mt-3"/>
                                        <div>
                                            <h1 className="font-bold text-lg mb-4">Items</h1>
                                            <div className="grid grid-cols-2 lg:grid-cols-2 grid-flow-row gap-4">
                                                {orderDetail.cart.map((item: IOrderCart, index:number) => (
                                                    <Card
                                                        key={index}
                                                        shadow="none"
                                                        className="shadow-md rounded-xl"
                                                    >
                                                        <CardBody 
                                                            className="overflow-visible p-0"
                                                        >
                                                            <div className="grid grid-cols-6 md:grid-cols-12 gap-2 md:gap-4 items-center justify-center">
                                                                <div className="relative col-span-6 md:col-span-4">
                                                                    <Image
                                                                        alt={item.menuItem?.name}
                                                                        aria-label={"menuimg-"+index}
                                                                        className="object-cover h-[150px]"
                                                                        shadow="md"
                                                                        src={item.menuItem?.image_url}
                                                                        width="100%"
                                                                    />
                                                                </div>
                                                                <div className="flex flex-col col-span-6 md:col-span-8">
                                                                    <div className="flex justify-between items-start pl-2 pr-2 pb-3 lg:pb-0 lg:pl-0 lg:pr-0">
                                                                        <div className="flex flex-col lg:pr-4 gap-0 overflow-x-auto">
                                                                            <h3 className="text-foreground/90 text-md lg:text-lg font-bold">{item.menuItem?.name}</h3>
                                                                            <p className="text-foreground/80 text-sm lg:text-sm">{item.menuItem?.category}</p>
                                                                            <div className="flex flex-nowrap mt-1 lg:mt-2 items-center">
                                                                                <div className="mr-2 text-sm lg:text-md text-foreground-500">{item.quantity} x ${item.menuItem?.price} =</div>
                                                                                <div className="text-md lg:text-large font-semibold">${item.quantity * (item.menuItem?.price as unknown as number)}</div>
                                                                            </div>
                                                                            {item.notes && 
                                                                                <div className="text-nowrap py-2 text-default-500 overflow-x-auto text-sm">
                                                                                    <div>{item.notes}</div>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                ))}
                                            </div>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter className="mt-2">
                                        {orderDetail.status === "COMPLETED" ? 
                                        (
                                            <>
                                            <Button 
                                                color="primary" 
                                                onPress={() => {
                                                    doDeleteOrder(orderDetail.id);
                                                    onClose();
                                                }}
                                                className="bg-gray-500 gap-2"
                                                size="lg"
                                                fullWidth
                                            >
                                                <FaReceipt size={22} />Print Invoice
                                            </Button>
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
                                                <FaTrashCan size={22} />Delete This Order
                                            </Button>
                                            </>
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
                                                <HiCheckBadge size={22} />Complete This Order
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