import Categories from "@/components/home/Categories";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import HeroSection from "@/components/home/HeroSection";
import ImageGallery from "@/components/home/ImageGallery";
import ProductBenefit from "@/components/home/ProductBenefit";

const HomeView = () => {
  return (
    <div className="mx-auto container">
      <HeroSection />
      <Categories />
      <FeaturedProduct />
      <ProductBenefit />
      <ImageGallery />
    </div>
  );
};

export default HomeView;
