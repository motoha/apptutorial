'use client';

import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { useStateContext } from '../context/AppContext';
import NotFound from '../notfound/page';
import { Toaster, toast } from 'react-hot-toast';

const Catalog = () => {
 
  const { state, dispatch } = useCart();
  // const sampleProduct = [
  //   {
  //   id: '1',
  //   name: 'Sample Product',
  //   price: 100,
  //   image: "",
  //   quantity: 1
  // },
  // {
  //   id: '2',
  //   name: 'cvvxvxv',
  //   price: 10,
  //   image: "",
  //   quantity: 1
  // }
  // ];

  const [data, setData] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token} = useStateContext();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://api.npoint.io/b30e4a8860f918ad9e01');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data: CartItem[] = await response.json();
        setData(data );
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching the data');
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  
// if(token) 
 return(
  <>
    <div className="  bg-gray-100 flex flex-col justify-center">
      <div className="relative m-3 flex flex-wrap mx-auto justify-center">
    
        
        {data.map((item) => (
            
    
    
    
    <div key={item.id} className="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
        
          <div className="overflow-x-hidden rounded-2xl relative">
            <img className="h-40 rounded-2xl w-full object-cover" src={item.image} />
            <p className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-50 opacity-70" fill="none" viewBox="0 0 24 24" stroke="black">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </p>
          </div>
          <div className="mt-4 pl-2 mb-2 flex justify-between ">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-0">{item.title}</p>
              <p className="text-md text-gray-800 mt-0">{item.price}</p>
            </div>
            <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="gray">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
             <Link href={`/products/${item.id}`}>View</Link>
             <button onClick={() => {
              dispatch({ type: 'ADD_TO_CART', item: item })
              toast('Added to cart' , { icon: '👏',});
             }}> Add </button>
          </div>
        </div>
    
    
    
    
            ))}
    
      </div>
    </div>
        <Toaster
        position="bottom-right"
        
        reverseOrder={false}
      />

    </>
    );

    // return (
    //   <div>
    //     <NotFound />
    //   </div>
    // );
};

export default Catalog;
