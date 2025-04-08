import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, Badge, Tooltip, Switch } from "@heroui/react";
import { HiArrowLeftStartOnRectangle, HiArrowRightEndOnRectangle, HiOutlineMoon, HiOutlineSun, HiShoppingBag } from "react-icons/hi2";
import { JSX, useState } from "react";
import { useLocation } from 'react-router-dom'
import useThemeSwitchStore from "../../../stores/ThemeSwitchStore";
import useAuthStore from "../../../stores/AuthStore";
import useOrderStore from "../../../stores/OrderStore";
import { FaHouse, FaQuestion } from "react-icons/fa6";

interface TopNavbarItem {
    key: string;
    label: string;
    href: string;
    icon?: JSX.Element;
}

const listMenu = [
    {
        key: "home",
        label: "Home",
        href: "/",
        icon: <FaHouse/>
    },
    {
        key: "about",
        label: "About Us",
        href: "/about",
        icon: <FaQuestion/>
    }
];

const TopNavbar = () => {
    const currentLocation = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isDark, switchTheme } = useThemeSwitchStore();
    const { 
        totalData,
        deleteOrderStore,
    } = useOrderStore();
    const { accessToken, deleteAccessToken } = useAuthStore();
    const logout = () => {
        deleteAccessToken();
        deleteOrderStore();
        window.location.href = "/";
    };

    return (
        <Navbar 
            id="topNavbar"
            isBordered
            onMenuOpenChange={setIsMenuOpen}
            maxWidth="full"
            classNames={{ 
                wrapper:[
                    "xl:w-9/12 xl:p-0 xl:m-0"
                ],
                item:[
                    "flex",
                    "relative",
                    "h-full",
                    "items-center",
                ]
            }}
        >
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />
            <NavbarBrand>
                <Link href="/" className="font-semibold text-lg lg:text-xl bg-gradient-to-r bg-clip-text from-sky-600 to-teal-400 text-transparent">WPU Cafe</Link>
            </NavbarBrand>
            <NavbarContent className="gap-2" justify="end">
                {listMenu && listMenu.map((item: TopNavbarItem)=> (
                    <NavbarItem 
                        key={"navitem"+item.key} 
                        aria-label={"navitem"+item.key} 
                        isActive={ item.href === currentLocation.pathname ? true : false }
                        className="hidden sm:flex"
                    >
                        <Tooltip
                            content={item.label}
                            showArrow={true}
                            closeDelay={1}
                            size="sm"
                            classNames={{
                                base: [
                                    // arrow color
                                    item.href === currentLocation.pathname ? "before:bg-teal-600" : "before:bg-default",
                                ],
                                content: [
                                    "py-2 px-4 shadow-xl",
                                    item.href === currentLocation.pathname ? "text-white bg-teal-600" : "text-black dark:text-white bg-default"
                                ],
                            }}
                        >
                            <Button 
                                as={Link} 
                                aria-current="page" 
                                variant="flat"
                                className={item.href === currentLocation.pathname ? "bg-teal-600 text-white" : "text-foreground"} 
                                href={item.href} 
                                isIconOnly
                            >
                                {item.icon}
                            </Button>
                        </Tooltip>
                    </NavbarItem>
                ))}
                <NavbarItem className="flex items-center gap-2">
                    <Badge color="primary" content={totalData} isInvisible={accessToken ? false: true} size="md" shape="circle" variant="solid">
                        <Tooltip 
                            content={accessToken ? "Manage Orders" : "Login to Manage Orders"}
                            showArrow={true}
                            classNames={{
                                base: [
                                    // arrow color
                                    currentLocation.pathname === "/orders" ? "before:bg-teal-600" : "before:bg-default",
                                ],
                                content: [
                                    "py-2 px-4 shadow-xl",
                                    currentLocation.pathname === "/orders" ? "text-white bg-teal-600" : "text-black dark:text-white bg-default"
                                ],
                            }}
                            closeDelay={1}
                            size="sm"
                        >
                            <Button 
                                as={Link} href="/orders" 
                                variant="flat" 
                                aria-label="cart-btn" 
                                isIconOnly
                                className={currentLocation.pathname === "/orders" ? "bg-teal-600 text-white" : "text-foreground"}
                            >
                                <HiShoppingBag size={20} />
                            </Button>
                        </Tooltip>
                    </Badge>
                    <Switch
                        defaultSelected
                        color="secondary"
                        endContent={<HiOutlineMoon />}
                        size="lg"
                        startContent={<HiOutlineSun />}
                        isSelected={!isDark}
                        onValueChange={() => switchTheme(!isDark)}
                        classNames={{ 
                            wrapper: [
                                "group-data-[selected=true]:text-gray-600",
                                "group-data-[selected=true]:bg-gray-200"
                            ]
                        }}
                    >
                    </Switch>
                    {accessToken ? 
                        (
                            <Tooltip 
                                content="Logout" 
                                showArrow={true}
                                closeDelay={1}
                                size="sm"
                                classNames={{
                                    base: [
                                        // arrow color
                                        "before:bg-danger",
                                    ],
                                    content: ["py-2 px-4 shadow-xl", "text-white bg-danger"],
                                }}
                            >
                                <Button 
                                    type="button"
                                    className="bg-danger text-white hidden sm:flex" 
                                    onPress={
                                        ()=> {
                                            logout();
                                        }
                                    } 
                                    variant="flat"
                                    isIconOnly
                                >
                                    <HiArrowLeftStartOnRectangle size={20}/>
                                </Button>
                            </Tooltip>
                        ) : 
                        (
                            <Tooltip 
                                content="Login" 
                                showArrow={true}
                                closeDelay={1}
                                size="sm"
                                classNames={{
                                    base: [
                                        // arrow color
                                        "before:bg-slate-500",
                                    ],
                                    content: ["py-2 px-4 shadow-xl", "text-white bg-slate-500"],
                                }}
                            >
                                <Button 
                                    as={Link} 
                                    className="bg-slate-500 dark:bg-slate-600 text-white hidden sm:flex" 
                                    href="/login" 
                                    variant="flat" 
                                    isIconOnly>
                                    <HiArrowRightEndOnRectangle size={20}/>
                                </Button>
                            </Tooltip>
                        )
                    }
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu className="pt-5">
                {listMenu && listMenu.map((item: TopNavbarItem)=> (
                    <NavbarMenuItem aria-label={"navitem"+item.key} isActive={ item.href === currentLocation.pathname ? true : false }>
                        <Link aria-current="page" className={item.href === currentLocation.pathname ? "text-teal-600" : "text-foreground"} href={item.href}>
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
                <NavbarMenuItem>
                    {accessToken ? 
                        (
                            <Button 
                                type="button"
                                className="bg-danger text-white" 
                                onPress={
                                    ()=> {
                                        logout();
                                    }
                                }
                                variant="flat"
                            >
                                <HiArrowLeftStartOnRectangle size={20}/> Logout
                            </Button>
                        ) : 
                        (
                            <Button as={Link} className="bg-slate-500 dark:bg-slate-600 text-white" href="/login" variant="flat">
                                <HiArrowRightEndOnRectangle size={20}/> Login
                            </Button>
                        )
                    }
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    )
}

export default TopNavbar;