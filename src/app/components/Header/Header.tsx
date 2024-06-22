 
'use client'  


// components/Header.tsx
import { useState, useRef, useEffect } from 'react';
import { motion , AnimatePresence} from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { useStateContext } from '@/app/context/AppContext';
import { redirect } from 'next/navigation';
 
 
interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
  }
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { idrole, token, setIdRole} = useStateContext();
  const {   setToken  } = useStateContext();
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
    const onLogout = ( ) => {
      console.log("tes")
      setToken(null)
      setIdRole("1")
      redirect('/')
       
    };
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


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
                <Link href="/" className="hover:text-gray-700">Home</Link>
                <Link href="/about" className="hover:text-gray-700"  >About</Link>
                <Link href="/product" className="hover:text-gray-700"  >Product</Link>
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
                <div className="relative" ref={dropdownRef}>
      <img
        src={'https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_3_0.png'}
        alt={`s avatar`}
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <aside className="w-64" aria-label="Sidebar">
		<div className="px-3 py-4 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800">
			<ul className="space-y-2">
				<li>
					<Link href="/dashboard"
						className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
						<svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
							fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
							<path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
						</svg>
						<span className="ml-3">Dashboard</span>
					</Link>
				</li>
				<li>
					<a href="#" target="_blank"
						className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
						<svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
							fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
							</path>
						</svg>
						<span className="flex-1 ml-3 whitespace-nowrap">Kanban</span>
						<span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
					</a>
				</li>
				<li>
					<a href="#" target="_blank"
						className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
						<svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
							fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z">
							</path>
							<path
								d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z">
							</path>
						</svg>
						<span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
						<span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span>
					</a>
				</li>
				<li>
					<a href="#"
						className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
						<svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
							fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
								clip-rule="evenodd"></path>
						</svg>
						<span className="flex-1 ml-3 whitespace-nowrap">Users</span>
					</a>
				</li>
				<li>
					<a href="#"
						className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
						<svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
							fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd"
								d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
								clip-rule="evenodd"></path>
						</svg>
						<span className="flex-1 ml-3 whitespace-nowrap">Products</span>
					</a>
				</li>
				<li>
					<a href="#"
						className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
						<svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
							fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd"
								d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
								clip-rule="evenodd"></path>
						</svg>
						<span className="flex-1 ml-3 whitespace-nowrap">Sign In</span>
					</a>
				</li>
				<li>
					<a href="#"
						className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
						<svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
							fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd"
								d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
								clip-rule="evenodd"></path>
						</svg>
						<span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
					</a>
				</li>
			</ul>
		</div>
	</aside>
        </div>
      )}
    </div>
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
                {  token   ? <Link href={"/dashboard"}><span> User</span></Link> : <></>   }  
        {  token  ?    <button onClick={onLogout}
         
         className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
       >
         Sign Out
       </button>       :  <Link href= "/login" >    <button
         
         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
       >
         Sign In
       </button>   </Link> }
         
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
