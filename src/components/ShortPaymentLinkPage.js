// ShortPaymentLinkPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ShortPaymentLinkPage = () => {
  const [paymentLink, setPaymentLink] = useState("");

  const generatePaymentLink = () => {
    // Generate a random unique code for the payment link
    const uniqueCode = generateRandomCode();

    // Form the payment link URL
    const link = `${uniqueCode}`;

    // Update the state with the generated payment link
    setPaymentLink(link);
  };

  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const codeLength = 8; // Adjust the length of the unique code as needed

    let randomCode = "";
    for (let i = 0; i < codeLength; i++) {
      randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return randomCode;
  };

  return (
    <div>
      <h1>Short Payment Link Page</h1>
      <button onClick={generatePaymentLink}>Generate My Payment Link</button>
      <br />
      {paymentLink && (
        <div>
          <p>Your Payment Link:</p>
          <Link to={`/${paymentLink}`}>{`http://localhost:3000/${paymentLink}`}</Link>
        </div>
      )}
    </div>
  );
};

export default ShortPaymentLinkPage;
