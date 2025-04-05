import { addToast } from "@heroui/react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Select, SelectItem } from "@heroui/select";
import * as yup from "yup";
import { FaClipboardCheck, FaClipboardList } from "react-icons/fa6";
import useOrderStore from "../../stores/OrderStore";
import { IOrderCart, IOrderCreate } from "../../types/Orders";
import { ORDER_TABLES } from "../../constants/constants";
import MenuCardList from "../../components/ui/MenuCardList";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ordersServices from "../../services/orders.service";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/spinner";

interface PropTypes {
    isOpen: boolean;
    onOpenChange: () => void;
}

const OrderCreate = (props: PropTypes) => {
    const {
        isOpen,
        onOpenChange,
    } = props;

    const orderState  = useOrderStore();
    const [isCreating, setIsCreating] = useState(false);

    const orderValidator = yup.object().shape({
        customerName: yup.string().required("Please input Customer's name!"),
        tableNumber: yup.number().typeError("Please select Table Number!").required("Please select Table Number!"),
        cart: yup.array().required("No order to be found, please add items!"),
    });


    const {
        control,
        register,
        handleSubmit,
        setError,
        reset,
        formState,
        formState: { errors }
    } = useForm<IOrderCreate>({
        resolver: yupResolver(orderValidator)
    });

    useFieldArray({
        control,
        name: "cart",
    });

    const onSubmit: SubmitHandler<IOrderCreate> = async (data) => {
        setIsCreating(true);
        
        data = Object.assign(data, {cart: orderState.carts});
        await ordersServices.create(data)
            .then(() => {
                addToast({
                    title: "Success!",
                    description: "Customer's order has been created...",
                    timeout: 3000,
                    shouldShowTimeoutProgress: true,
                    color: "success",
                });

                setIsCreating(false);
                orderState.doReloadOrder();
                orderState.clearCart();
                onOpenChange();
            })
            .catch(() => {
                setIsCreating(false);
                setError("root.serverError", {
                    message: "Woopss something happens, unable to create order!",
                });

                addToast({
                    title: "Woopss something happens!",
                    description: "Unable to make order...",
                    timeout: 3000,
                    shouldShowTimeoutProgress: true,
                    color: "danger",
                });
            }
        );
    };

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ customerName: "", tableNumber: 0, cart: [] })
        }
    }, [formState, reset]);

    return (
        <div className="min-w-full p-2">
            <Modal
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                className="min-w-fit"
                scrollBehavior="inside"
                size="full"
            >
                <ModalContent>
                    {
                    () => (
                        <>
                            <ModalHeader className="flex flex-col mb-2">
                                <p className="flex items-center justify-start text-lg xl:text-xl">
                                    <FaClipboardList className="mr-2"/>Create New Order
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <Form className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-0" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex flex-col gap-8">
                                        <div>
                                            <h1 className="font-bold text-xl mb-4">Customer Information</h1>
                                            <div className="flex flex-col gap-5">
                                                <div className="grid gap-2">
                                                    <h1 className="font-bold">Name</h1>
                                                    <Input
                                                        {...register("customerName", {required: true})}
                                                        key={"input-customer-name"}
                                                        name="customerName"
                                                        placeholder="Input Customer's Name"
                                                        className="w-full lg:w-[60%]"
                                                        isClearable
                                                        isInvalid={errors.customerName !== undefined}
                                                        errorMessage={(<p>{errors.customerName?.message}</p>)}
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <h1 className="font-bold">Table Number</h1>
                                                    <Select
                                                        {...register("tableNumber", {required: true})}
                                                        key={"input-table-number"}
                                                        name="tableNumber"
                                                        placeholder="Select"
                                                        className="w-full lg:w-[10%]"
                                                        isInvalid={errors.tableNumber !== undefined}
                                                        aria-label="select-tableNumber"
                                                        errorMessage={errors.tableNumber?.message}
                                                    >
                                                        {ORDER_TABLES.map((item) => (
                                                            <SelectItem key={item.value}>{item.label}</SelectItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <h1 className="font-bold text-xl mb-4">Current Order</h1>
                                            {orderState.carts.length === 0 ? 
                                                (
                                                    <p className="text-sm text-foreground-500">
                                                        No Order Yet
                                                    </p>
                                                )
                                            : 
                                                orderState.carts.map((item: IOrderCart, index) =>(
                                                    <div key={item.menuItemId} className="grid grid-cols-2 items-center text-sm">
                                                        <div className="grid grid-cols-1 lg:grid-cols-2">
                                                            <p>{item.name}</p>
                                                            <Input 
                                                                className="text-justify hidden lg:flex"
                                                                placeholder="Add Note"
                                                                size="sm"
                                                                value={item.notes}
                                                                onChange={(e)=>{
                                                                    orderState.addNoteToCarItem(item.menuItemId as unknown as string, e.target.value)
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 lg:grid-cols-3 items-center ml-2 ">
                                                            <div className="text-right mr-4 hidden lg:block">
                                                                <span className="mr-4">${item.price}</span>
                                                                <span>x</span>
                                                            </div>
                                                            <div className="grid grid-cols-3 items-center justify-items-center">
                                                                <Button
                                                                    isIconOnly
                                                                    size="sm"
                                                                    variant="bordered"
                                                                    onPress={
                                                                        () => {
                                                                            orderState.addToCart("decrement", item.menuItemId as unknown as string, item.name as unknown as string, 0)
                                                                        }
                                                                    }
                                                                >
                                                                    -
                                                                </Button>
                                                                {/* <Input className="text-center" value={item.quantity as unknown as string}/> */}
                                                                <p>{item.quantity as unknown as string}</p>
                                                                <Button
                                                                    isIconOnly
                                                                    size="sm"
                                                                    variant="bordered"
                                                                    onPress={
                                                                        () => {
                                                                            orderState.addToCart("increment", item.menuItemId as unknown as string, item.name as unknown as string, item.price as unknown as number)
                                                                        }
                                                                    }
                                                                >
                                                                    +
                                                                </Button>
                                                            </div>
                                                            <div className="pr-3 text-end font-semibold">${item.totalPrice}</div>
                                                        </div>
                                                        <input
                                                            type="hidden" 
                                                            key={item.menuItemId}
                                                            {...register(`cart.${index}`)} 
                                                            hidden={true}
                                                        />
                                                    </div>
                                                ))
                                            }
                                            <p className="text-end text-foreground-400">+</p>
                                            <hr/>
                                            <div className="grid grid-cols-2 gap-2 mt-2 text-md">
                                                <p className="font-bold">Grand Total</p>
                                                <p className="text-end font-bold pr-3">${orderState.grandTotal}</p>
                                            </div>
                                            <div className="mt-5">
                                                <Button 
                                                    size="lg"
                                                    type="submit"
                                                    fullWidth
                                                    className="bg-teal-600 gap-2 text-white"
                                                    onPress={
                                                        () => {

                                                        }
                                                    }
                                                    isDisabled={orderState.carts.length === 0 || isCreating}
                                                >
                                                    {
                                                        isCreating ? (
                                                            <Spinner color="white" size="sm"/>
                                                        ): 
                                                        (
                                                            <><FaClipboardCheck size={20}/>Make Order</>
                                                        )
                                                    }
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="font-bold text-xl mb-4">Menus</h1>
                                        <MenuCardList
                                            isOrderable={true}
                                            showSearch={true}
                                            showCategoryFilter={true}
                                            gridCols={2}
                                            isFull={false}
                                        />
                                    </div>
                                </Form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    );
}

export default OrderCreate;