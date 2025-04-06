import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Tooltip } from "@heroui/tooltip";
import { FaRegEnvelope } from "react-icons/fa6";


const Footer = () => {
    return (
        <div
            className="grid grid-cols-2 min-w-full mt-auto gap-5 p-5 items-center lg:items-end"
        >
            <div className="text-default-400 text-xs lg:text-sm">© 2025 Fahmy Abdul. All Rights Reserved.</div>
            <div className="flex justify-end">
                <Link
                    href="mailto:firstfahmyabdul@gmail.com"
                    target="blank"
                >
                    <Tooltip
                        content="Contact Support"
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
                            color="default"
                            radius="full"
                            variant="solid"
                            isIconOnly
                        >
                            <FaRegEnvelope className="size-4"/>
                        </Button>
                    </Tooltip>
                </Link>
            </div>
        </div>
    )
}

export default Footer;