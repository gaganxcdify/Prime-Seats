import "./Payment.css"

import React from 'react';

const Payment = () => {
  const handlePayment = () => {
    // Handle payment logic here
    console.log('Payment completed');
    // You can redirect to a success page or perform any other action after payment completion
  };

  return (
    <div className="payment-container summary-bigbox">
      <h2 className="payment-title">Payment Page</h2>
      <form className="payment-form" onSubmit={handlePayment}>
        <label className="payment-label">
          Card Number:
          <input className="payment-input" type="text" />
        </label>
        <label className="payment-label">
          Expiry Date:
          <input className="payment-input" type="text" />
        </label>
        <label className="payment-label">
          CVV:
          <input className="payment-input" type="text" />
        </label>
        <button className="payment-submit-button" type="submit">Submit Payment</button>
      </form>
    </div>
  );
}

export default Payment;