'use client';

import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Define the type for the product data
type ProductData = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  colors: string[];
  sizes: string[];
};

const ProductDetailAPI = () => {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('https://api.npoint.io/31f5162ff1c7f55af037'); // Replace with your API URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ProductData = await response.json();
        setProductData(data);
        setSelectedColor(data.colors[0]);
        setSelectedSize(data.sizes[0]);
        setSelectedImage(data.images[0]);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  const handleAddToCart = () => {
    // Implement the add to cart functionality
    if (productData) {
      console.log('Added to cart:', {
        productId: productData.id,
        color: selectedColor,
        size: selectedSize
      });
    }
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  const settings = {
    customPaging: (i: number) => (
      <a onClick={() => setSelectedImage(productData.images[i])}>
        <img src={productData.images[i]} alt={`thumbnail-${i}`} style={{ width: "100px", height: "50px" }} />
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
    <div className="flex justify-center items-start min-h-screen py-10">
      <div className="flex flex-row max-w-6xl">
        <div className="w-1/2 max-w-md">
          <Slider {...settings}>
            {productData.images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`product-${index}`} className="w-full h-auto" />
              </div>
            ))}
          </Slider>
        </div>
        <div className="w-1/2 max-w-md p-6">
          <h1 className="text-2xl font-bold">{productData.name}</h1>
          <p className="mt-4">{productData.description}</p>
          <p className="mt-4 text-xl font-semibold">Price: ${productData.price}</p>
          <div className="mt-4">
            <h3 className="font-semibold">Color</h3>
            {productData.colors.map((color, index) => (
              <button
                key={index}
                className={`p-2 border rounded mr-2 mt-2 ${color === selectedColor ? 'bg-gray-200' : 'bg-white'}`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Size</h3>
            {productData.sizes.map((size, index) => (
              <button
                key={index}
                className={`p-2 border rounded mr-2 mt-2 ${size === selectedSize ? 'bg-gray-200' : 'bg-white'}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <button
            className="mt-6 bg-blue-500 text-white p-3 rounded"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailAPI;
