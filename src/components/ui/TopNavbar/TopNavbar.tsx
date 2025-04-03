import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenuItem, NavbarMenu } from "@heroui/react";
import { HiArrowLeftEndOnRectangle, HiOutlineMoon, HiOutlineSun, HiShoppingCart } from "react-icons/hi2";
import { JSX, useState } from "react";
import { useLocation } from 'react-router-dom'
import useThemeSwitchStore from "../../../stores/ThemeSwitchStore";

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
        key: "menus",
        label: "Menus",
        href: "/menus",
    },
    {
        key: "about",
        label: "About Us",
        href: "/about",
    },
];

const TopNavbar = () => {
    const { isDark, switchTheme } = useThemeSwitchStore();
    // Using Zustand State
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentLocation = useLocation();

    return (
        <Navbar 
            onMenuOpenChange={setIsMenuOpen}
            maxWidth="full"
            isBordered
            classNames={{ 
                item:[
                    "flex",
                    "relative",
                    "h-full",
                    "items-center",
                    "data-[active=true]:after:content-['']",
                    "data-[active=true]:after:absolute",
                    "data-[active=true]:after:bottom-0",
                    "data-[active=true]:after:left-0",
                    "data-[active=true]:after:right-0",
                    "data-[active=true]:after:h-[3px]",
                    "data-[active=true]:after:rounded-[2px]",
                    "data-[active=true]:after:bg-teal-600",
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
                    <NavbarItem aria-label={"navitem"+item.key} isActive={ item.href === currentLocation.pathname ? true : false }>
                        <Link aria-current="page" className={item.href === currentLocation.pathname ? "text-teal-600" : "text-foreground"} href={item.href}>
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent className="hidden sm:flex" justify="end">
                <NavbarItem className="flex items-center gap-2">
                    <Button variant="flat" aria-label="cart-btn" isIconOnly>
                        <HiShoppingCart size={20} />
                    </Button>
                    <Button 
                        variant="flat" 
                        aria-label="switch-theme" 
                        isIconOnly
                        onPress={() => switchTheme(!isDark)}
                    >
                        {isDark ? (<HiOutlineSun size={20} />): (<HiOutlineMoon size={20} />)}
                    </Button>
                    <Button as={Link} className="bg-teal-600 text-white" href="#" variant="flat">
                        <HiArrowLeftEndOnRectangle size={20}/>Login
                    </Button>
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
                    <Link href="#">
                        <HiArrowLeftEndOnRectangle size={20}/>Login
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    )
}

export default TopNavbar;