import React from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { deleteProduct, getAllProducts } from "../../store/admin/products-slice";
import { toast } from "sonner";

function AdminProductTile({
  product,
  setCurrentEditedId,
  setOpenAddProductDialog,
  setFormData,
}) {
  const dispatch = useDispatch();
  const eidtProductHandler = (e) => {
    e.preventDefault();
    setOpenAddProductDialog(true);
    setCurrentEditedId(product._id);
    setFormData(product);
  };

  const productDeleteHandler = (e) => {
    e.preventDefault();
    dispatch(deleteProduct(product._id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllProducts());
        toast.success("Product Deleted successfully");
      }else{
        toast.error("Product cant be Deleted !!!");

      }
    });
  };

  return (
    <Card className="w-full max-w-sm mx-auto pt-0 pb-2">
      <div className="">
        <div className="relative mb-3">
          <img
            src={product.image}
            alt={product.productName}
            className="w-full h-[300px]   object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{product.productName}</h2>
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
        <CardFooter className="flex justify-between gap-1 items-center">
          <Button onClick={eidtProductHandler}>Edit</Button>
          <Button onClick={productDeleteHandler}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
