import { useState, useEffect } from 'react';
import { fetchProductById } from '../services/product.service';

export const useProductDetail = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchProductById(productId);

        if (result.success) {
          setProduct(result.data);
          setSelectedImage(result.data.image);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const reloadProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchProductById(productId);

      if (result.success) {
        setProduct(result.data);
        setSelectedImage(result.data.image);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return {
    product,
    loading,
    error,
    selectedImage,
    setSelectedImage,
    reloadProduct,
  };
};
