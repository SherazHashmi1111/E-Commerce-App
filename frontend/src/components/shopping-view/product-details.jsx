import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogDescription/>
        <DialogTitle/>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.productName}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="grid gap-6">
            <div className="">
                <h1 className="text-3xl font-extrabold">{productDetails?.productName}</h1>
                <p className="text-muted-foreground">{productDetails?.description}</p>
            </div>
        <Button className="mt-auto">Order Now</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
