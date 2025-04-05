import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, Badge, Tooltip } from "@heroui/react";
import { HiArrowLeftStartOnRectangle, HiArrowRightEndOnRectangle, HiOutlineMoon, HiOutlineSun, HiShoppingBag } from "react-icons/hi2";
import { JSX, useState } from "react";
import { useLocation } from 'react-router-dom'
import useThemeSwitchStore from "../../../stores/ThemeSwitchStore";
import useAuthStore from "../../../stores/AuthStore";
import useOrderStore from "../../../stores/OrderStore";
import { cn } from "../../../utils/cn";

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
    },
    {
        key: "about",
        label: "About Us",
        href: "/about",
    },
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
    }

    return (
        <Navbar 
            onMenuOpenChange={setIsMenuOpen}
            maxWidth="full"
            // isBordered
            classNames={{ 
                item:[
                    "flex",
                    "relative",
                    "h-full",
                    "items-center",
                    // "data-[active=true]:after:content-['']",
                    // "data-[active=true]:after:absolute",
                    // "data-[active=true]:after:bottom-0",
                    // "data-[active=true]:after:left-0",
                    // "data-[active=true]:after:right-0",
                    // "data-[active=true]:after:h-[3px]",
                    // "data-[active=true]:after:rounded-[2px]",
                    // "data-[active=true]:after:bg-teal-600",
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
            <NavbarContent 
                className="hidden sm:flex gap-6" 
                justify="center"
            >
                {listMenu && listMenu.map((item: TopNavbarItem)=> (
                    <NavbarItem key={"navitem"+item.key} aria-label={"navitem"+item.key} isActive={ item.href === currentLocation.pathname ? true : false }>
                        <Link aria-current="page" className={item.href === currentLocation.pathname ? "text-teal-600" : "text-foreground"} href={item.href}>
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="flex items-center gap-2">
                    <Badge color="primary" content={totalData} isInvisible={accessToken ? false: true} size="md" shape="circle" variant="solid">
                        <Tooltip 
                            content="You need to Login to order" 
                            showArrow={accessToken ? false : true}
                            className={cn("p-2",{
                                "hidden after:hidden": accessToken,
                            })}
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
                    <Button 
                        variant="flat" 
                        aria-label="switch-theme" 
                        isIconOnly
                        onPress={() => switchTheme(!isDark)}
                    >
                        {isDark ? (<HiOutlineSun size={20} />): (<HiOutlineMoon size={20} />)}
                    </Button>
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
                                        "before:bg-teal-600",
                                    ],
                                    content: ["py-2 px-4 shadow-xl", "text-white bg-teal-600"],
                                }}
                            >
                                <Button as={Link} className="bg-teal-600 text-white hidden sm:flex" href="/login" variant="flat" isIconOnly>
                                    <HiArrowRightEndOnRectangle size={20}/>
                                </Button>
                            </Tooltip>
                        )
                    }
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
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
                            <Button as={Link} className="bg-teal-600 text-white" href="/login" variant="flat">
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