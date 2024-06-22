"use client"

import React from 'react';
import { useCart } from './shop_context';
 
import { Toaster, toast } from 'react-hot-toast';
 
const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const checkoot = () => {
    console.log(state.items)
    console.log(JSON.stringify(state.items))
  };

  const handleSendCart = async () => {
    await sendCartDataToAPI( );
   toast('Cart data sent to the server!' , { icon: '👏',});
  };

  const sendCartDataToAPI = async ( ) => {
    try {
      const response = await fetch('https://your-api-endpoint.com/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state.items),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return ( 
    
    
    
   <>
   
   
   <div>
      <h2>Cart</h2>
      {state.items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {state.items.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.quantity}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      {state.items.length > 0 && <button onClick={clearCart}>Clear Cart</button>}
      <button onClick={checkoot}>Checkout</button>
    </div> <Toaster
  position="bottom-right"
  
  reverseOrder={false}
/>

   
   </>




  );
};

export default Cart;
