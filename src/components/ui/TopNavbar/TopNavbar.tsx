import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenuItem, NavbarMenu } from "@heroui/react";
import { HiArrowLeftEndOnRectangle, HiOutlineMoon, HiShoppingCart } from "react-icons/hi2";
import { useState } from "react";

const TopNavbar = () => {
    // Using Zustand State
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Navbar 
            onMenuOpenChange={setIsMenuOpen}
            maxWidth="full"
            isBordered
        >
            <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
            />
            <NavbarBrand>
                <Link href="/" className="font-semibold lg:text-lg text-teal-600">WPU Cafe</Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-6" justify="center">
                <NavbarItem isActive>
                    <Link aria-current="page" href="/">
                    Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#menus">
                        Menus
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/about">
                        About Us
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex" justify="end">
                <NavbarItem className="flex items-center gap-2">
                    <Button variant="flat" aria-label="switch-theme" isIconOnly>
                        <HiShoppingCart size={20} />
                    </Button>
                    <Button variant="flat" aria-label="switch-theme" isIconOnly>
                        <HiOutlineMoon size={20} />
                    </Button>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        <HiArrowLeftEndOnRectangle size={20}/>Login
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem>
                    <Link aria-current="page" href="/">
                        Beranda
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link color="foreground" href="/about">
                        Tentang Kami
                    </Link>
                </NavbarMenuItem>
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