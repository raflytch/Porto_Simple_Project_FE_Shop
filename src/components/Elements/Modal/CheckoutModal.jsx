import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { clearCart } from '../../../features/cart/cartSlice';
import { FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const paymentMethods = [
  { id: 'gopay', name: 'GoPay' },
  { id: 'bca', name: 'BCA Transfer' },
  { id: 'mandiri', name: 'Mandiri Transfer' },
  { id: 'ovo', name: 'OVO' },
  { id: 'dana', name: 'DANA' },
];

const CheckoutModal = ({ isOpen, onClose, totalAmount, onPaymentSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      paymentMethod: '',
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    Swal.fire({
      title: 'Cancel Payment?',
      text: 'Are you sure you want to cancel this payment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep paying',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cancelled', 'Your payment has been cancelled.', 'info');
        onClose();
      }
    });
  };

  const onSubmit = (data) => {
    Swal.fire({
      title: 'Confirm Payment',
      text: `Are you sure you want to pay $${totalAmount.toFixed(2)}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, pay now!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Processing Payment',
          text: 'Please wait...',
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          Swal.fire(
            'Payment Successful!',
            'Your payment has been processed successfully.',
            'success'
          ).then(() => {
            onPaymentSuccess();
          });
        });
      }
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={handleClose}
      ></div>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-lg w-full max-w-md">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Checkout</h2>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                      {...register('name', {
                        required: 'Name is required',
                        minLength: {
                          value: 3,
                          message: 'Name must be at least 3 characters',
                        },
                      })}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your phone number"
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9]{10,12}$/,
                          message: 'Please enter a valid phone number',
                        },
                      })}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Method
                    </label>
                    <select
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.paymentMethod
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                      {...register('paymentMethod', {
                        required: 'Please select a payment method',
                      })}
                    >
                      <option value="">Select payment method</option>
                      {paymentMethods.map((method) => (
                        <option key={method.id} value={method.id}>
                          {method.name}
                        </option>
                      ))}
                    </select>
                    {errors.paymentMethod && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.paymentMethod.message}
                      </p>
                    )}
                  </div>

                  {/* Total Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Amount
                    </label>
                    <input
                      type="text"
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      value={`$${totalAmount.toFixed(2)}`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-4 transition-colors duration-200"
                  >
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
