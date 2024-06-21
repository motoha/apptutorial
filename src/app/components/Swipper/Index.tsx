 
import ProductSwiper from './Product';
import { Swiper, SwiperSlide } from 'swiper/react';

const SwipperProduct: React.FC = () => {
  const products = [
    { id: 1, name: 'Product 1', image: '/images/1.jpg', price: 29.99 },
    { id: 2, name: 'Product 2', image: '/images/1.jpg', price: 39.99 },
    { id: 3, name: 'Product 3', image: '/images/1.jpg', price: 19.99 },
    { id: 4, name: 'Product 4', image: '/images/1.jpg', price: 49.99 },
  ];

  return (
    <div>
      <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
     
    </Swiper>
    </div>
  );
};

export default SwipperProduct