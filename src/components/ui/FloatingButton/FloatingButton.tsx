import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Tooltip } from "@heroui/tooltip";
import { ReactNode } from "react";
import { FaRegEnvelope, FaTelegram } from "react-icons/fa6";

interface IFloatingButtonTooltip {
    content: string;
    color: string;
}
interface IFloatingButtonButton {
    color: string;
    target: string;
    href: string;
    label: ReactNode;
}

interface IFloatingButton {
    tooltip: IFloatingButtonTooltip;
    button: IFloatingButtonButton;
}

interface PropTypes {
    floatingList?: IFloatingButton[];
}

const FloatingButton = (props: PropTypes) => {
    let { floatingList } = props;
    
    if (!floatingList) {
        floatingList = [
            {
                "tooltip": {"content": "Contact Email", "color": "bg-slate-500"}, 
                "button": {"color": "bg-slate-500", "target": "blank", "href": "mailto:firstfahmyabdul@gmail.com", "label": <FaRegEnvelope className="size-4"/>},
            },
            {
                "tooltip": {"content": "Telegram", "color": "bg-sky-500"}, 
                "button": {"color": "bg-sky-500", "target": "blank", "href": "https://t.me/fahmyabdul", "label": <FaTelegram className="size-6"/>},
            },
        ]
    }

    return (
        <div className="fixed z-10 flex-row hidden gap-2 sm:flex bottom-5 right-5">
            {floatingList?.map((item, index) => (
                <Tooltip
                    key={`floatingbutton-${index}`}
                    content={item.tooltip.content}
                    showArrow={true}
                    closeDelay={1}
                    placement="left"
                    size="sm"
                    classNames={{
                        base: [
                            // arrow color
                            `before:${item.tooltip.color}`,
                        ],
                        content: [
                            "py-2 px-4 shadow-xl",
                            `text-white ${item.tooltip.color}`
                        ],
                    }}
                >
                    <Button
                        key={`floatingbutton-btn-${index}`}
                        className={`text-tiny text-white drop-shadow-neon-black-sm ${item.button.color}`}
                        as={Link}
                        target={item.button.target}
                        href={item.button.href}
                        color="default"
                        radius="full"
                        variant="solid"
                        isIconOnly
                    >
                        {item.button.label}
                    </Button>
                </Tooltip>
            ))}
        </div>
    );
}

export default FloatingButton;