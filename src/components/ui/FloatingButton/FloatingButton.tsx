import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Tooltip } from "@heroui/tooltip";
import { FaRegEnvelope, FaTelegram } from "react-icons/fa6";

const FloatingButton = () => {
    return (
        <div className="hidden sm:flex flex-col fixed bottom-5 right-5 gap-2 z-10">
            <Tooltip
                content="Tele Me"
                showArrow={true}
                closeDelay={1}
                placement="left"
                size="sm"
                classNames={{
                    base: [
                        // arrow color
                        "before:bg-sky-500",
                    ],
                    content: [
                        "py-2 px-4 shadow-xl",
                        "text-white bg-sky-500"
                    ],
                }}
            >
                <Button
                    className="text-tiny text-white bg-sky-500"
                    as={Link}
                    target="blank"
                    href="mailto:firstfahmyabdul@gmail.com"
                    color="default"
                    radius="full"
                    variant="solid"
                    isIconOnly
                >
                    <FaTelegram className="size-6"/>
                </Button>
            </Tooltip>
            <Tooltip
                content="Email Me"
                showArrow={true}
                closeDelay={1}
                placement="left"
                size="sm"
                classNames={{
                    base: [
                        // arrow color
                        "before:bg-slate-500",
                    ],
                    content: [
                        "py-2 px-4 shadow-xl",
                        "text-white bg-slate-500"
                    ],
                }}
            >
                <Button
                    className="text-tiny text-white bg-slate-500"
                    as={Link}
                    target="blank"
                    href="mailto:firstfahmyabdul@gmail.com"
                    color="default"
                    radius="full"
                    variant="solid"
                    isIconOnly
                >
                    <FaRegEnvelope className="size-4"/>
                </Button>
            </Tooltip>
        </div>
    );
}

export default FloatingButton;