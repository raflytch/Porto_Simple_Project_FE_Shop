import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  clearCart,
} from '../features/cart/cartSlice';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa6';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items: cartItems, totalAmount } = useSelector((state) => state.cart);

  const handleIncreaseQuantity = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p>Looks like you haven't added any items to your cart yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">
        Your Cart
      </h1>
      <div className="grid gap-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="card bg-base-100 shadow-lg rounded-md p-4 sm:p-6"
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
                  className="btn btn-sm btn-circle"
                  onClick={() => handleDecreaseQuantity(item.id)}
                >
                  <FaMinus />
                </button>
                <span className="font-bold w-8 text-center">
                  {item.quantity}
                </span>
                <button
                  className="btn btn-sm btn-circle"
                  onClick={() => handleIncreaseQuantity(item)}
                >
                  <FaPlus />
                </button>
              </div>

              {/* Total Price */}
              <div className="text-right">
                <span className="font-bold">${item.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="card bg-base-100 shadow-lg mt-4 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <button
              className="btn btn-error btn-outline flex items-center justify-center sm:w-auto mb-4 sm:mb-0"
              onClick={handleClearCart}
            >
              <FaTrash className="mr-2" /> Clear Cart
            </button>
            <div className="text-right">
              <p className="text-xl font-bold mb-2 sm:mb-0">
                Total: ${totalAmount.toFixed(2)}
              </p>
              <button className="btn btn-primary w-full sm:w-auto">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
