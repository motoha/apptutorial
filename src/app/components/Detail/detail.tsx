'use client'

import { useState } from 'react';
import styles from './product.module.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const productData = {
  id: 1,
  name: "Sample Product",
  description: "This is a sample product.",
  price: 99.99,
  images: [
    "https://studiodog.co.uk/wp-content/uploads/2018/01/Fashion-Studio-Dog24.jpg",
    "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    "https://studiodog.co.uk/wp-content/uploads/2018/01/Fashion-Studio-Dog19.jpg"
  ],
  colors: ["Red", "Blue", "Green"],
  sizes: ["S", "M", "L", "XL"]
};

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState<string>(productData.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(productData.sizes[0]);
  const [selectedImage, setSelectedImage] = useState<string>(productData.images[0]);

  const settings = {
    customPaging: (i: number) => (
      <a onClick={() => setSelectedImage(productData.images[i])}>
        <img src={productData.images[i]} alt={`thumbnail-${i}`} style={{ width: "50px", height: "50px" }} />
      </a>
    ),
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => setSelectedImage(productData.images[next]),
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageGallery}>
        <Slider {...settings}>
          {productData.images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`product-${index}`} />
            </div>
          ))}
        </Slider>
      </div>
      <div className={styles.productInfo}>
        <h1>{productData.name}</h1>
        <p>{productData.description}</p>
        <p>Price: ${productData.price}</p>
        <div>
          <h3>Color</h3>
          {productData.colors.map((color, index) => (
            <button
              key={index}
              className={`${styles.optionButton} ${color === selectedColor ? styles.selected : ""}`}
              onClick={() => setSelectedColor(color)}
            >
              {color}
            </button>
          ))}
        </div>
        <div>
          <h3>Size</h3>
          {productData.sizes.map((size, index) => (
            <button
              key={index}
              className={`${styles.optionButton} ${size === selectedSize ? styles.selected : ""}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;