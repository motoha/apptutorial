import Image from "next/image";
import Header from "./components/Header/Header";
import Carousel from "./components/SliderBanner";
import TopProducts from "./components/TopProduct/Index";
import './style.css';
import Products from "./components/Products/Index";
import Fotter from "./components/Footer/Index";
import SwipperProduct from "./components/Swipper/Index";
import Trusted from "./components/Homepage/Trusted";
export default function Home(props:any) {
  return (
   <>

   
   
    <Carousel />
    <Products />
    <Trusted />
    
    
   </>
  );
}
