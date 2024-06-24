'use client';

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

 

const Pay = () => {
  const { state, dispatch } = useCart();
  const router = useRouter()

  const toggleMenu = ( ) => {
    console.log(state)
    router.push('/checkout')
};

  return (
    <div className="mx-10 my-10">
      <h1 className="cursor-pointer" onClick={toggleMenu}>Checkout</h1>
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
