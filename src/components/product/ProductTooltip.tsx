"use client";

import { addItemToCart } from "@/redux/features/cart/cart.slice";
import { useAppDispatch } from "@/redux/hooks";
import { IProduct } from "@/types";
import { Eye, ReceiptText, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const ProductTooltip = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
  };
  return (
    <div
      className="absolute top-[-100%] left-0 backdrop-blur-sm w-full h-full center  group-hover/image:top-0 overflow-hidden"
      style={{ transition: "0.3s" }}
    >
      <div className="flex items-center justify-center border-[1px] border-primaryMat bg-white rounded-[3px] overflow-hidden p-[5px]">
        <button
          className="p-[5px] border-x-[1px] border-borderColor hover:bg-[#f0f0f0]"
          onClick={handleAddToCart}
        >
          <ShoppingCart />
        </button>
        <button className="p-[5px] border-r-[1px] border-borderColor hover:bg-[#f0f0f0]">
          <ReceiptText />
        </button>
        <Link
          to={`/product/${product._id}`}
          className="p-[5px] border-r-[1px] border-borderColor hover:bg-[#f0f0f0]"
        >
          <Eye />
        </Link>
      </div>
    </div>
  );
};

export default ProductTooltip;
