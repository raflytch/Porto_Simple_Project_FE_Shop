import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addToCart,
  removeFromCart,
  clearCart,
} from '../features/cart/cartSlice';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa6';
import PaymentSuccessModal from '../components/Elements/Modal/PaymentSuccessModal';
import CheckoutModal from '../components/Elements/Modal/CheckoutModal';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: cartItems, totalAmount } = useSelector((state) => state.cart);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const handleIncreaseQuantity = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePaymentSuccess = () => {
    setIsCheckoutOpen(false);
    setShowPaymentSuccess(true);
    dispatch(clearCart());
  };

  const handleBackToShopping = () => {
    setShowPaymentSuccess(false);
    navigate('/');
  };

  if (cartItems.length === 0 && !showPaymentSuccess) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p>Looks like you haven't added any items to your cart yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {!showPaymentSuccess ? (
        <>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">
            Your Cart
          </h1>
          <div className="grid gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 sm:p-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto_auto] gap-4 items-center">
                  {/* Image */}
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  {/* Title and Price */}
                  <div className="min-w-0">
                    <h2 className="text-base font-semibold line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2 justify-center">
                    <button
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      <FaMinus className="w-3 h-3" />
                    </button>
                    <span className="font-bold w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                      onClick={() => handleIncreaseQuantity(item)}
                    >
                      <FaPlus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Total Price */}
                  <div className="text-right">
                    <span className="font-bold">
                      ${item.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-lg shadow-md mt-4 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <button
                  className="mb-4 sm:mb-0 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 flex items-center justify-center sm:w-auto"
                  onClick={handleClearCart}
                >
                  <FaTrash className="mr-2" /> Clear Cart
                </button>
                <div className="text-right">
                  <p className="text-xl font-bold mb-2 sm:mb-0">
                    Total: ${totalAmount.toFixed(2)}
                  </p>
                  <button
                    className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={() => setIsCheckoutOpen(true)}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            totalAmount={totalAmount}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </>
      ) : (
        <PaymentSuccessModal onBackToShopping={handleBackToShopping} />
      )}
    </div>
  );
};

export default CartPage;
