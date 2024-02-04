import React, { useState } from 'react';
// import './styles.css'; // Make sure to import your styles
// import uploadIcon from './upload-icon.png'; // Make sure to adjust the path based on your project structure

const QRPayment = () => {
  const [textInputValue, setTextInputValue] = useState('');

  return (
    <div className="container">
      <div className="qr-code">
        <h2>Receiver's Address</h2>
        <div className="upload-qr">
          {/* <img src={uploadIcon} alt="Upload QR" /> */}
          <p>Upload the QR</p>
        </div>
      </div>
      <h1>OR</h1>
      <div className="address-input">
        <label htmlFor="address">Enter the Address:</label>
        <input
          type="text"
          id="additionalText"
          name="additionalText"
          value={textInputValue}
          onChange={(e) => setTextInputValue(e.target.value)}
        />
      </div>
      <button className="proceed-button">Proceed to Pay</button>
    </div>
  );
};

export default QRPayment;
