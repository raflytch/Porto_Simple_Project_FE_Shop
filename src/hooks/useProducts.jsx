import { useState, useEffect } from 'react';
import {
  fetchAllProducts,
  fetchProductsByCategory,
} from '../services/product.service';

export const useProducts = (initialCategory = '') => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing",
  ]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const loadProducts = async (category = selectedCategory) => {
    setLoading(true);
    setError(null);

    try {
      const result = category
        ? await fetchProductsByCategory(category)
        : await fetchAllProducts();

      if (result.success) {
        setProducts(Array.isArray(result.data) ? result.data : []);
        setSelectedCategory(category);
      } else {
        setError(result.error);
        setProducts([]);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(selectedCategory);
  }, [selectedCategory]);

  const changeCategory = (category) => {
    setSelectedCategory(category);
  };

  return {
    products,
    loading,
    error,
    categories,
    selectedCategory,
    changeCategory,
    reloadProducts: loadProducts,
  };
};
