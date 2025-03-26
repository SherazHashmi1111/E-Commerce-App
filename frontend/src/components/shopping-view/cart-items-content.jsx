import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem } from "../../store/shop/cart-slice";
import { toast } from "sonner";

function CartItemsContent({ item }) {
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  function handleCartItemDelete (cartItem){
    
    dispatch(deleteCartItem({ userId: user?.id, productId:cartItem?.productId }))
    toast('Item deleted')
  }
  return (
    <div className="flex items-center space-x-4">
      <img
        src={item?.image}
        alt={item?.productName}
        className="w-20 h-20 rounded object-cover shadow"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{item?.productName}</h3>
        <div className="flex items-center mt-1 gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full cursor-pointer"
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="px-2 border">{item?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (item?.salePrice > 0 ? item?.salePrice : item?.price) *
            item?.quantity
          ).toFixed(2)}
        </p>
        <Trash className="cursor-pointer mt-1" size={20} onClick={() => handleCartItemDelete(item)}/>
      </div>
    </div>
  );
}

export default CartItemsContent;
