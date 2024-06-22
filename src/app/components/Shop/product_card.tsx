"use client"

import React, { useEffect, useState } from 'react';
import { useCart } from './shop_context';
// import { Product } from './types';
 
import { Product  } from './product_interface';
import ProductCard from './card_element';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';

 
const PCard: React.FC = () => {
  const { dispatch } = useCart();
  const showToast = () => {
    toast.success('Button clicked successfully!');
  };
  const [proddata, proddatachange] = useState<Product []>([]);
   

  useEffect(() => {
   
    fetch('https://api.npoint.io/c0737c132550eab422f5')
      .then(response => response.json())
      .then(data => proddatachange(data.product));
  }, [proddata]);


  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', product }) ;
    toast('Added to cart' , { icon: '👏',});
     
  };

  return (
    < >


    <div>
      <h2>Products</h2>
      <ul>
        {proddata.map(product => (
          <li key={product.id}>
           <ProductCard
          id={product.id} 
          name={product.name}
          
          price={product.price}
           
          
        />
            <button className='' onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <div>     <Link  href="/cart">Cart</Link></div>
 
    </div>
    <Toaster
  position="bottom-right"
  
  reverseOrder={false}
/>
    
     </ >
  );
};

export default PCard;
