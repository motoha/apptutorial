// components/Carousel.tsx
'use client'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import Slider from "react-slick";
import './slider.css';

const Carousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  return (
    <section className='homeSlider mx-10 h-100'>
    <div className='container-fluid position-relative h-100'>
        <Slider {...settings} className='home_slider_Main'>
            <div className="item">
                <img src='/images/1.jpg' className='w-100' />
                <div className='info'>
                    <h5 className="mb-4">
                        Don’t miss amazing<br />
                        grocery deals
                    </h5>
                    <p>Sign up for the daily newsletter</p>
                </div>
            </div>
            <div className="item">
                <img src='/images/1.jpg' className='w-100' />
                <div className='info'>
                    <h5 className="mb-3">
                        Fresh Vegetables<br />
                        Big discount
                    </h5>
                    <p>Sign up for the daily newsletter</p>
                </div>
            </div>
        </Slider>
 
        

    </div>
</section>
  );
};

export default Carousel;
