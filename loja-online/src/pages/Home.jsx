import React, { useState, useEffect } from 'react';
import { getAllProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';

/**
 * Home Page
 * Responsible for fetching data, managing filters, and rendering the list.
 */
const Home = () => {
  // --- STATES ---
  const [products, setProducts] = useState([]);       // All products from the API
  const [categories, setCategories] = useState([]);   // List of categories for the filter
  
  // UI States (Loading and Error) - Mandatory requirement
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');           // Search text
  const [selectedCategory, setSelectedCategory] = useState(''); // Selected category

  // --- EFFECTS (useEffect) ---
  
  // Runs only once when the page mounts to fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Starts loading
        
        // We fetch products and categories in parallel to be faster
        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(),
          getCategories()
        ]);

        setProducts(productsData);
        setCategories(categoriesData);
        setError(null); // Clears old errors if any
      } catch (err) {
        console.error("Error loading Home:", err);
        setError("Could not load the products. Please try again later.");
      } finally {
        setLoading(false); // Ends loading (success or error)
      }
    };

    fetchData();
  }, []); // Empty array = runs only on mount

  // --- FILTERING LOGIC ---
  
  // We filter the original product list based on user inputs
  const filteredProducts = products.filter((product) => {
    // 1. Filter by Category (if any selected)
    const matchesCategory = selectedCategory 
      ? product.category === selectedCategory 
      : true; // If no category selected, accepts all

    // 2. Filter by Text (Search by name)
    // We convert everything to lowercase so the search is not case-sensitive
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // --- RENDERING ---

  // If loading, shows visual feedback
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Loading products...</h2>
      </div>
    );
  }

  // If there's an error, shows the message
  if (error) {
    return (
      <div style={{ textAlign: 'center', color: 'red', marginTop: '50px' }}>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>Products</h1>

      {/* --- FILTERS AREA --- */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem',
        flexWrap: 'wrap',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', flex: 1, minWidth: '200px' }}
        />

        {/* Category Select */}
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '8px', minWidth: '150px' }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {/* Capitalizes the first letter of the category to look nicer */}
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* --- LISTING (GRID) --- */}
      {filteredProducts.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Creates responsive grid automatically
          gap: '2rem' 
        }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found with these filters.</p>
      )}
    </div>
  );
};

export default Home;