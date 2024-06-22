"use client"
import { useState } from 'react';
import ProductFilter from '../components/Filter/ProductFilter';
import ProductList from '../components/Filter/Productist';
import { useCart } from '../context/CartContext';
 

type Product = {
    id: number;
    name: string;  image: string;
    category: string;
    brand: string;
    price: number;
};

const initialProducts: Product[] = [
    { id: 1, name: 'Product 1', category: 'Electronics', brand: 'Brand A', price: 200 , image :"/images/1.jpg" },
    { id: 2, name: 'Product 2', category: 'Clothing', brand: 'Brand B', price: 50 , image :"/images/1.jpg" },
    { id: 3, name: 'Product 3', category: 'Electronics', brand: 'Brand C', price: 400 , image :"/images/1.jpg" },
    { id: 4, name: 'Product 4', category: 'Clothing', brand: 'Brand A', price: 70 , image :"/images/1.jpg" },
    // Add more products as needed
];
const { state, dispatch } = useCart();
const categories = ['Electronics', 'Clothing'];
const brands = ['Brand A', 'Brand B', 'Brand C'];

const Home = () => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);

    const handleFilterChange = (filters: any) => {
        let filtered = initialProducts;

        if (filters.category) {
            filtered = filtered.filter(product => product.category === filters.category);
        }

        if (filters.selectedBrands.length > 0) {
            filtered = filtered.filter(product => filters.selectedBrands.includes(product.brand));
        }

        filtered = filtered.filter(product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]);

        setFilteredProducts(filtered);
    };

    return (
        <div className="grid grid-cols-3 gap-4 my-10 mx-10">
            <div className="col-span-1">
                <ProductFilter categories={categories} brands={brands} onFilterChange={handleFilterChange} />
            </div>
            <div className="col-span-2">
                <ProductList products={filteredProducts} />
            </div>
        </div>
    );
};

export default Home;
