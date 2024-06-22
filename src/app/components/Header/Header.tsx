 
'use client'  


// components/Header.tsx
import { useState, useRef, useEffect } from 'react';
import { motion , AnimatePresence} from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
 
 
interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
  }
const Header = () => {

  const { cartCount } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState<CartItem[]>([
      { id: 1, name: 'Product 1', price: 10, quantity: 2 },
      { id: 2, name: 'Product 2', price: 15, quantity: 1 },
    ])
    const cartRef = useRef<HTMLDivElement>(null)
    
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const megaMenuRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
            setOpenMenu(null);
        }
    };
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
          if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
            setIsCartOpen(false)
          }
        }
    
        if (isCartOpen) {
          document.addEventListener('mousedown', handleOutsideClick)
        }
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick)
        }
      }, [isCartOpen])


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = (menuName: string) => {
        setOpenMenu(openMenu === menuName ? null : menuName);
    };
    const toggleCart = () => setIsCartOpen(!isCartOpen)
    return (
        <> 
 <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className=" fixed inset-0 bg-black z-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              ref={cartRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 overflow-y-auto z-50"
            >
              <button 
                onClick={toggleCart}
                className="absolute top-2 right-2 text-gray-500"
              >
                Close
              </button>
              <h2 className="text-xl font-bold mb-4">Your Cart</h2>
              {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <>
                  {cartItems.map(item => (
                    <div key={item.id} className="mb-4 border-b pb-2">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p>Price: ${item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  ))}
                  <div className="mt-4">
                    <strong>Total: $
                      {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                    </strong>
                  </div>
                  <Link href={"/checkout"} > Check out</Link>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
        <header className="sticky top-0 bg-white shadow-md z-40 ">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold">Brand</div>
                <nav className="hidden md:flex space-x-4">
                    <a href="/" className="hover:text-gray-700">Home</a>
                    <a href="/about" className="hover:text-gray-700"  >About</a>
                    <a href="/product" className="hover:text-gray-700"  >Product</a>
                    <div className="relative" ref={megaMenuRef}>
                        <button onClick={() => toggleMenu('services')} className="hover:text-gray-700">Services</button>
                        {openMenu === 'services' && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md"
                            >
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Service 1</a>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Service 2</a>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Service 3</a>
                            </motion.div>
                        )}
                    </div>
                    <div className="relative">
                        <button onClick={() => toggleMenu('products')} className="hover:text-gray-700">Products</button>
                        {openMenu === 'products' && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md"
                            >
                                <Link href="/catalog" className="block px-4 py-2 hover:bg-gray-100">Product List</Link>
                                <Link href="/cart" className="block px-4 py-2 hover:bg-gray-100">Cart</Link>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Product 3</a>
                            </motion.div>
                        )}
                    </div>
                    <Link href="/filter" className="hover:text-gray-700">Contact</Link>
                    <Link href="/cart" className="hover:text-gray-700">Cart</Link>
                    <Link href="/catalog" className="hover:text-gray-700">Cata</Link>
                </nav>
                <button 
          onClick={toggleCart}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
         Cart    ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
        </button>
                <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
                <Link href= "/pay" >   <span>Cart ({cartCount})</span>  </Link>   
        <button
          
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Sign Out
        </button>
         
            </div>
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden fixed inset-0 bg-white z-40"
                >
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="text-2xl font-bold">Brand</div>
                        <button onClick={() => setMobileMenuOpen(false)} className="md:hidden">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <nav className="container mx-auto px-4 py-4">
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Home</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">About</a>
                        <div className="relative">
                            <button onClick={() => toggleMenu('mobile-services')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Services</button>
                            {openMenu === 'mobile-services' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="pl-4"
                                >
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Service 1</a>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Service 2</a>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Service 3</a>
                                </motion.div>
                            )}
                        </div>
                        <div className="relative">
                            <button onClick={() => toggleMenu('mobile-products')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Products</button>
                            {openMenu === 'mobile-products' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="pl-4"
                                >
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Product 1</a>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Product 2</a>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Product 3</a>
                                </motion.div>
                            )}
                        </div>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Contact</a>
                    </nav>
                </motion.div>
            )}
        </header>

       

        </>
        
    );
};

export default Header;
