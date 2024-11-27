import React from 'react';
import PaymentSuccess from '../../../../public/paymentsuccces.jpg';

const PaymentSuccessModal = ({ onBackToShopping }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <img
            src={PaymentSuccess}
            alt="Payment Success"
            className="w-64 h-64 mx-auto mb-6 object-contain"
          />
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been processed
            successfully.
          </p>
          <button
            onClick={onBackToShopping}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
