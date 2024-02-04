// QRScannerPage.js
import React, { useState } from "react";
import QrReader from "react-qr-reader";
import jsQR from "jsqr";

const QRScannerPage = () => {
  const [qrContent, setQrContent] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        processImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (imageData) => {
    const img = new Image();
    img.src = imageData;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setQrContent(code.data);
      } else {
        setQrContent("QR code not found");
      }
    };
  };

  return (
    <div className="qr-scanner-container">
      <h1>QR Code Scanner</h1>

      <label htmlFor="qrImageUpload">Upload QR Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        id="qrImageUpload"
      />

      {uploadedImage && (
        <>
          <img
            src={uploadedImage}
            alt="Uploaded QR Image"
            className="uploaded-image"
          />
          <br />
        </>
      )}

      {/* <QrReader
        delay={300}
        onError={(err) => console.error("QR Code Scanner Error:", err)}
        onScan={(data) => {
          if (data) {
            setQrContent(data);
          }
        }}
        style={{ width: "100%" }}
      /> */}

      {qrContent && <p>Scanned QR Content: {qrContent}</p>}
    </div>
  );
};

export default QRScannerPage;
