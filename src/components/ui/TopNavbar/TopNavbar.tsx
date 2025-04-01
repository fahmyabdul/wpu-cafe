import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input } from "@heroui/react";
import { HiArrowLeftEndOnRectangle, HiOutlineMoon, HiShoppingCart } from "react-icons/hi2";
import useSearchStore from "../../../stores/MenuSearchStore";

const TopNavbar = () => {
    // Using Zustand State
    const { search } = useSearchStore();

    return (
        <Navbar>
            <NavbarBrand>
                <Link href="/" className="font-semibold text-green-700">WPU Cafe</Link>
            </NavbarBrand>
            <NavbarContent className="sm:flex gap-4" justify="center">
                <NavbarItem isActive>
                    <Link aria-current="page" href="/">
                        Beranda
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Input
                        placeholder="Cari di WPU Cafe"
                        aria-label="input-search"
                        width={100}
                        onChange={(e)=> {
                                search(e.target.value);
                            }
                        }
                    />
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/about">
                        Tentang Kami
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="flex items-center gap-2">
                    <Button variant="flat" aria-label="switch-theme" isIconOnly>
                        <HiShoppingCart size={20} />
                    </Button>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        <HiArrowLeftEndOnRectangle size={20}/>Login
                    </Button>
                    <Button variant="flat" aria-label="switch-theme" isIconOnly>
                        <HiOutlineMoon size={20} />
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}

export default TopNavbar;