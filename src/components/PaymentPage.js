// src/components/PaymentPage.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const [qrContent, setQrContent] = useState("");

  useEffect(() => {
    // Retrieve QR content from the query parameter
    const qrContentFromQuery = new URLSearchParams(location.search).get(
      "qrContent"
    );
    setQrContent(qrContentFromQuery);
  }, [location.search]);

  return (
    <div>
      <h1>Payment Page</h1>
      <p>QR Content: {qrContent}</p>
      {/* Display transaction details and payment options */}
    </div>
  );
};

export default PaymentPage;
