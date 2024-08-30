"use client";

import { addItemToCart } from "@/redux/features/cart/cart.slice";
import { useAppDispatch } from "@/redux/hooks";
import { IProduct } from "@/types";
import { ShoppingCart } from "lucide-react";

const ProductAddToCartBtn = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
  };
  return (
    <button
      className="center gap-[5px] rounded-[5px] w-[90%] mx-auto bg-primaryMat text-white font-bold py-2 prounded hover:bg-green-500 group/cart overflow-hidden"
      onClick={handleAddToCart}
    >
      Add
      <ShoppingCart
        className="left-0 group-hover/cart:left-[150px] group-hover/cart:rotate-[-15deg] relative"
        style={{ transition: "0.5s" }}
      />
    </button>
  );
};

export default ProductAddToCartBtn;
