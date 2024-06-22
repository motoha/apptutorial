'use client';

import { useCart } from '../context/CartContext';

const Catalog = () => {
 
  const { state, dispatch } = useCart();
  const sampleProduct = {
    id: '1',
    name: 'Sample Product',
    price: 100,
    quantity: 1
  };

  return (
    <div>
      <h1>{sampleProduct.name}</h1>
      <p>Price: ${sampleProduct.price}</p>
      <button onClick={() => dispatch({ type: 'ADD_TO_CART', item: sampleProduct })}>
        Add to Cart
      </button>
    </div>
  );
};

export default Catalog;
