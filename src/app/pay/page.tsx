'use client';

import { useCart } from "../context/CartContext";

 

const Pay = () => {
  const { state, dispatch } = useCart();

  const toggleMenu = ( ) => {
    console.log(state)
};

  return (
    <div>
      <h1 onClick={toggleMenu}>Checkout</h1>
      {state.cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {state.cart.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.quantity}
              <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: item.id })}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Pay;
