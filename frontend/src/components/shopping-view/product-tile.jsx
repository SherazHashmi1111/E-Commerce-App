import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";

function ShoppingProductTile({ product, handleProductDetail, handleAddToCart }) {
  
  

  return (
    <Card className="w-full max-w-sm mx-auto pt-0 pb-2">
      <div className="" onClick={() => handleProductDetail(product?._id)}>
        <div className="relative mb-3">
          <img
            src={product.image}
            alt={product.productName}
            className="w-full h-[300px]   object-cover rounded-t-lg"
          />
          {product?.salePrice > 0 ? (
            <Badge
              variant="outline"
              className="absolute top-2 left-2 bg-red-500 hover:bg-red-800 hover:text-white"
            >
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product.productName}</h2>
          <div className="flex justify-between mb-2 items-center">
            <span className="text-md text-muted-foreground capitalize">
              {product?.category}
            </span>
            <span className="text-md text-muted-foreground capitalize">
              {product?.brand}
            </span>
          </div>
          <div className="flex justify-between mb-2 ">
            <span
              className={`text-lg font-semibold text-primary ${
                product?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              $ {product.price}
            </span>
            {product.salePrice > 0 && <span className="text-lg font-bold">$ {product.salePrice}</span>}
          </div>
        </CardContent>
      </div>
        <CardFooter className="w-full">
          <Button onClick={() => handleAddToCart(product?._id)} className="cursor-pointer w-full" variant='outline'>Add to Cart</Button>
        </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
 