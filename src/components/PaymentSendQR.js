import React, { useState } from 'react';

const QRGenerator = () => {
  const [amount, setAmount] = useState('');
  const [country, setCountry] = useState('');
  const [transaction, setTransaction] = useState('');
  const [cryptoCurrency, setCryptoCurrency] = useState('');
  const [customCryptoCurrency, setCustomCryptoCurrency] = useState('');

  const handleCryptoCurrencyChange = (e) => {
    const selectedCryptoCurrency = e.target.value;
    setCryptoCurrency(selectedCryptoCurrency);

    // Reset customCryptoCurrency when a predefined crypto currency is selected
    if (selectedCryptoCurrency !== 'custom') {
      setCustomCryptoCurrency('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your QR code generation logic here
  };

  return (
    <div className="container">
      <form className="qr-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">You are asked to play:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cryptoCurrency">Select or Enter Cryptocurrency:</label>
          <select
            id="cryptoCurrency"
            name="cryptoCurrency"
            required
            value={cryptoCurrency}
            onChange={handleCryptoCurrencyChange}
          >
            <option value="">Select a cryptocurrency</option>
            <option value="BTC">Bitcoin</option>
            <option value="ETH">Ethereum</option>
            <option value="LTC">Litecoin</option>
            <option value="custom">Custom</option>
            {/* Add more cryptocurrency options here */}
          </select>
          {cryptoCurrency === 'custom' && (
            <input
              type="text"
              id="customCryptoCurrency"
              name="customCryptoCurrency"
              placeholder="Enter custom cryptocurrency"
              value={customCryptoCurrency}
              onChange={(e) => setCustomCryptoCurrency(e.target.value)}
            />
          )}
        </div>

        <label htmlFor="country">Geofencing:</label>
        <select
          id="country"
          name="country"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Geofencing to</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="UK">United Kingdom</option>
          {/* Add more country options here */}
        </select>

        <label htmlFor="transaction">What is this transaction for?</label>
        <textarea
          id="transaction"
          name="transaction"
          rows="4"
          cols="50"
          required
          value={transaction}
          onChange={(e) => setTransaction(e.target.value)}
        ></textarea>

        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default QRGenerator;