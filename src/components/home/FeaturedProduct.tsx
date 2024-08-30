import { useGetFeaturedProductsQuery } from "@/redux/features/product/product.api";
import Loader from "@/utils/Loader";
import { Link } from "react-router-dom";
import ProductCard from "../product/ProductCard";
import SectionHeading from "../ui/sectionHeading";

const FeaturedProduct = () => {
  const { data, isLoading } = useGetFeaturedProductsQuery(undefined);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="w-full mt-[50px]">
      <SectionHeading text="Featured Product" />
      <div className="griProductResponsive gap-[20px]">
        {data?.data?.map((data, i) => (
          <ProductCard key={"product" + i} product={data} />
        ))}
      </div>
      <Link
        to={"/product"}
        className="w-fit mx-auto py-[8px] px-[20px] bg-primaryMat hover:bg-green-500 text-white rounded-[5px] center mt-[20px]"
      >
        Load more
      </Link>
    </section>
  );
};

export default FeaturedProduct;
