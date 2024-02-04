import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import QRCode from "qrcode.react";
import { useNavigate } from "react-router-dom";

const DynamicQRPage = ({ contract }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");
  const [qrImage, setQrImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    generateQRImage();
  }, [recipient, amount, reference, description]);

  const generateQRContent = () => {
    if (!amount.trim()) {
      return "";
    }

    const qrData = {
      recipient,
      amount,
      reference,
      description,
    };

    return encodeURIComponent(JSON.stringify(qrData));
  };

  const generateQRImage = () => {
    const qrContent = generateQRContent();
    if (qrContent) {
      const canvas = document.querySelector("canvas");
      if (canvas) {
        setQrImage(canvas.toDataURL("image/png"));
      }
    }
  };

  const copyImageToClipboard = () => {
    if (qrImage) {
      navigator.clipboard.writeText(qrImage).then(() => {
        alert("QR code image copied to clipboard!");
      });
    }
  };

  const downloadImage = () => {
    if (qrImage) {
      const link = document.createElement("a");
      link.href = qrImage;
      link.download = "qrcode.png";
      link.click();
    }
  };

  return (
    <div>
      <h1>Geofenced Payment Page</h1>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient Address"
      />
      <br />
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (ETH)"
      />
      <br />
      <input
        type="text"
        value={reference}
        onChange={(e) => setReference(e.target.value)}
        placeholder="Area Name eg.India"
      />
      <br />
      <QRCode value={generateQRContent()} />

      <br />
      {/* <button onClick={generateQRImage}>Generate QR Image</button> */}
      <div>
        <button onClick={copyImageToClipboard}>Copy Image</button>
        <button onClick={downloadImage}>Download Image</button>
      </div>
    </div>
  );
};

export default DynamicQRPage;
