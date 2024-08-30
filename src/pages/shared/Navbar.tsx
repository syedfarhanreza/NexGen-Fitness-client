import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useAppSelector } from "@/redux/hooks";
import { LucideShoppingCart, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  {
    lebel: "Home",
    href: "/",
  },
  {
    lebel: "Product",
    href: "/product",
  },
  {
    lebel: "Product Manage",
    href: "/manage-product",
  },
  {
    lebel: "About Us",
    href: "/aboutus",
  },
];

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { items, total } = useAppSelector((state) => state.cart);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // event target
      const target = event.target as HTMLElement;
      // screen width
      const screen = window.screen.width;

      // ---**** return if the screen width is larger
      if (screen > 1024) {
        return;
      }

      // return if the user click on the drawer or the navbar
      if (target.closest(".myDrawer") || target.closest(".menuBTn")) {
        return;
      }

      setShowSidebar(false);
    };

    // hide sidebar on clicking outside
    if (showSidebar) {
      document.body.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSidebar, setShowSidebar]);
  return (
    <div className="mx-auto container ">
      <div className="flex  items-center justify-between border-b-2 py-3 ">
        <Link to="/" className="flex items-center">
          <img src="/images/logo.png" className="w-[200px]" />
        </Link>
        <div className="center w-fit gap-[15px]">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <div className="flex justify-end">
                <NavigationMenuItem>
                  {navLinks.map(({ href, lebel }, i) => (
                    <Link to={href} key={i + "navlink"}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {lebel}
                      </NavigationMenuLink>
                    </Link>
                  ))}
                </NavigationMenuItem>
              </div>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="center gap-[10px]">
            <Link to={"/cart"} className="text-primaryTxt relative">
              <LucideShoppingCart />
              <span className="absolute text-[12px] top-[-14px] right-[-10px] text-white bg-cyan-400 shadow-md px-[5px] py-[3px] rounded-[8px]">
                {items.length}
              </span>
            </Link>
            <span className="font-[600] text-cyan-400">
              ${total.toFixed(2)}
            </span>
          </div>{" "}
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="md:hidden flex menuBTn"
          >
            {showSidebar ? <X /> : <Menu />}
          </button>
        </div>

        {/* sidebar */}
        <div
          className={`${
            showSidebar
              ? "w-[300px] border-r-[1px] px-[20px] pt-[20px]"
              : "w-[0px]"
          } bg-white left-0 top-0 fixed h-screen border-borderColor z-20 overflow-hidden myDrawer`}
          style={{ transition: "0.3s" }}
        >
          <Link to="/" className="flex items-center">
            <img src="/images/logo.png" className="w-[120px]" />
          </Link>
          <div className="w-full flex flex-col mt-[20px]">
            {navLinks.map(({ href, lebel }) => (
              <NavLink
                to={href}
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-primaryMat text-white" : "text-primaryTxt"
                  }  w-full px-[15px] py-[8px] rounded-[5px]`
                }
              >
                {lebel}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
