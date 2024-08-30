import ProductsView from "@/view/ProductsView";
import { useEffect } from "react";

const Product = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return <ProductsView />;
};

export default Product;
