// src/components/QRScannerPage.js
import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate, useLocation } from "react-router-dom";

const QRScannerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [qrContent, setQrContent] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    // Retrieve QR content from the query parameter
    const qrContentFromQuery = new URLSearchParams(location.search).get(
      "qrContent"
    );
    setQrContent(qrContentFromQuery);
  }, [location.search]);

  const handleScan = (data) => {
    if (data) {
      // Redirect to Payment Page with the scanned QR content
      navigate(`/payment?qrContent=${data}`);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1>QR Scanner Page</h1>
      <label htmlFor="qrImageUpload">Upload QR Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        id="qrImageUpload"
      />
      <br />
      {uploadedImage && (
        <>
          <img
            src={uploadedImage}
            alt="Uploaded QR Image"
            style={{ maxWidth: "100%" }}
          />
          <br />
        </>
      )}
      {/* <QrReader delay={300} onError={handleError} onScan={handleScan} />
      <p>{qrContent}</p> */}
    </div>
  );
};

export default QRScannerPage;
