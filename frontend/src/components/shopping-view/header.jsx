import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  House,
  LogOut,
  Menu,
  ShoppingCart,
  UserRoundCheck,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "../../config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logoutUser } from "../../store/authSlice";
import CartWrapper from "./cart-wraper";

// Menu items
const MenuItems = () => {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((item) => (
        <NavLink className="text-sm font-medium" key={item.id} to={item.path}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };
  
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4 ">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant={"outline"}
          size={"icon"}
          className="cursor-pointer"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="sr-only">User Cart</span>
        </Button>
        <CartWrapper cartItems={cartItems} />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold ">
              {user?.userName?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right">
          <DropdownMenuLabel>Logged in as : {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigate("/shop/account");
            }}
          >
            <UserRoundCheck className="mr-2 h-6 w-6" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logoutHandler}>
            <LogOut className="mr-2 h-6 w-6" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

function ShoppingHeader() {

  return (
    <header className="sticky top-0 z-40 w-full  border-b bg-background ">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <House className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden cursor-pointer"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs pl-6 pt-10">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block ">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
