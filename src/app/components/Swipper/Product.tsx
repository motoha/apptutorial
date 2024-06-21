import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
 
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface ProductSwiperProps {
  products: Product[];
}

const ProductSwiper: React.FC<ProductSwiperProps> = ({ products }) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
    >
      {products.map(product => (
        <SwiperSlide key={product.id}>
          <div>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.price.toFixed(2)}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};


export default ProductSwiper;
