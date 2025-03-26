import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import CartItemsContent from "./cart-items-content";

function CartWrapper({ cartItems }) {
  if(!cartItems.items)return;
  
  
  return (
    <SheetContent className="sm:mx-w-md overflow-scroll">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
        <SheetDescription></SheetDescription>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.items.length > 0
          ? cartItems.items.map((item) => <CartItemsContent key={item.productId} item={item} />)
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total Amount</span>
          <span className="font-bold">$ 1000</span>
        </div>
      </div>
      <Button className="w-full mt-6">Checkout</Button>
    </SheetContent>
  );
}

export default CartWrapper;
