// components/ProductFilter.tsx
import React, { useState } from 'react';
import ReactSlider from 'react-slider';

type ProductFilterProps = {
    categories: string[];
    brands: string[];
    onFilterChange: (filters: any) => void;
};

const ProductFilter: React.FC<ProductFilterProps> = ({ categories, brands, onFilterChange }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);


    
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        onFilterChange({ category, selectedBrands, priceRange });
    };

    const handleBrandChange = (brand: string) => {
        const newBrands = selectedBrands.includes(brand)
            ? selectedBrands.filter(b => b !== brand)
            : [...selectedBrands, brand];
        setSelectedBrands(newBrands);
        onFilterChange({ category: selectedCategory, selectedBrands: newBrands, priceRange });
    };

    const handlePriceRangeChange = (newRange: [number, number]) => {
        setPriceRange(newRange);
        onFilterChange({ category: selectedCategory, selectedBrands, priceRange: newRange });
    };

    return (
        <div className="product-filter">
            <h3>Categories</h3>
            {categories.map(category => (
                <div key={category}>
                    <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={() => handleCategoryChange(category)}
                    />
                    <label>{category}</label>
                </div>
            ))}

            <h3>Brands</h3>
            {brands.map(brand => (
                <div key={brand}>
                    <input
                        type="checkbox"
                        value={brand}
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                    />
                    <label>{brand}</label>
                </div>
            ))}

            <h3>Price Range</h3>
            <ReactSlider
                value={priceRange}
                min={0}
                max={1000}
                step={10}
                onChange={handlePriceRangeChange}
            />
            <div>Price: ${priceRange[0]} - ${priceRange[1]}</div>
        </div>
    );
};

export default ProductFilter;
