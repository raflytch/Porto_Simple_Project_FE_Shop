import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IoArrowBack } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa6';
import { MdOutlineRateReview } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from '../features/cart/cartSlice';
import { useProductDetail } from '../hooks/useProductDetail';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, loading, error, selectedImage } = useProductDetail(id);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      toast.success('Product added to cart!', {
        position: window.innerWidth <= 640 ? 'bottom-center' : 'top-right',
        autoClose: 1500,
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          className="flex items-center mb-6 hover:bg-gray-100 p-2 rounded-lg transition-colors"
          onClick={() => navigate('/')}
        >
          <IoArrowBack className="w-6 h-6 mr-2" />
          Back to Homepage
        </button>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square w-full bg-gray-200 animate-pulse rounded-xl" />
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 animate-pulse rounded w-3/4" />
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/4" />
            <div className="h-32 bg-gray-200 animate-pulse rounded w-full" />
            <div className="h-10 bg-gray-200 animate-pulse rounded w-1/3" />
            <div className="h-12 bg-gray-200 animate-pulse rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          className="flex items-center mb-6 hover:bg-gray-100 p-2 rounded-lg transition-colors"
          onClick={() => navigate('/')}
        >
          <IoArrowBack className="w-6 h-6 mr-2" />
          Back to Homepage
        </button>
        <div className="bg-red-50 p-6 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <button
        className="flex items-center mb-6 hover:bg-gray-100 p-2 rounded-lg transition-colors"
        onClick={() => navigate('/')}
      >
        <IoArrowBack className="w-6 h-6 mr-2" />
        Back to Homepage
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-square w-full rounded-xl overflow-hidden bg-white shadow-lg">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full object-contain p-4"
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {product.title}
            </h1>
            <span className="inline-block bg-gray-200 px-3 py-1 rounded-full text-sm">
              {product.category}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-500 w-5 h-5" />
              <span className="font-medium">
                {product.rating?.rate || 'N/A'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MdOutlineRateReview className="w-5 h-5" />
              <span>{product.rating?.count || 0} reviews</span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="text-3xl font-bold">${product.price}</div>

          <button
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
