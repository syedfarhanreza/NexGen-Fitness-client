import Footer from "@/pages/shared/Footer";
import Navbar from "@/pages/shared/Navbar";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const { items } = useAppSelector((state) => state.cart);

  useEffect(() => {
    window.onbeforeunload = function () {
      return !!items.length;
    };
  });
  return (
    <div className="">
      <Navbar />
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};
export default MainLayout;
