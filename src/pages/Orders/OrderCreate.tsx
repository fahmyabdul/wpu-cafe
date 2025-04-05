import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { HiMiniPlusCircle } from "react-icons/hi2";
import MenuCardList from "../../components/ui/MenuCardList";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import useOrderStore from "../../stores/OrderStore";
import { IOrderCart } from "../../types/Orders";
import { FaClipboardCheck } from "react-icons/fa6";
import { Select, SelectItem } from "@heroui/select";
import { ORDER_TABLES } from "../../constants/constants";


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
                    <ModalHeader className="flex flex-col mb-2">
                        <p className="flex items-center justify-start text-lg xl:text-xl">
                            <HiMiniPlusCircle className="mr-2"/>Create New Order
                        </p>
                    </ModalHeader>
                    <ModalBody className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 pt-0">
                        <div className="flex flex-col gap-8">
                            <div>
                                <h1 className="font-bold text-xl mb-4">Customer Information</h1>
                                <div className="flex flex-col gap-5">
                                    <div className="grid gap-2">
                                        <h1 className="font-bold">Name</h1>
                                        <Input
                                            key={"input-customer-name"}
                                            placeholder="Input Customer's Name"
                                            className="w-full lg:w-[60%]"
                                            isClearable
                                            isRequired
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <h1 className="font-bold">Table Number</h1>
                                        <Select
                                            key={"input-table-number"}
                                            placeholder="Select Table Number"
                                            className="w-full lg:w-[30%]"
                                            isRequired
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
                                    orderState.carts.map((item: IOrderCart) =>(
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
                                                <div className="text-end pr-3">${item.totalPrice}</div>
                                            </div>
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
                                        isDisabled={orderState.carts.length === 0}
                                    >
                                        <FaClipboardCheck size={20}/>Make Order
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className="font-bold text-xl mb-4">Menus</h1>
                            <MenuCardList/>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </div>
    );
}

export default OrderCreate;