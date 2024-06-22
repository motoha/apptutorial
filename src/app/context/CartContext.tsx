'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';


interface CartState {
  cart: CartItem[];
}

interface CartContextProps {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  cartCount: number;
}

type CartAction = 
  | { type: 'ADD_TO_CART'; item: CartItem }
  | { type: 'REMOVE_FROM_CART'; id: string };

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.item.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.item.id
              ? { ...item, quantity: item.quantity + action.item.quantity }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, action.item] };
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.id),
      };
    }
    default:
      return state;
  }
};

export const CartProviderx = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  const cartCount = state.cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ state, dispatch, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
