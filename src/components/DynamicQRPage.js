// src/components/DynamicQRPage.js
import React, { useState } from "react";
import { ethers } from "ethers";
import QRCode from "qrcode.react";
import { useNavigate } from "react-router-dom";

const DynamicQRPage = ({ contract }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const initiateTransaction = async () => {
    // Add validation to ensure the amount is not empty
    if (!amount.trim()) {
      alert("Amount cannot be empty!");
      return;
    }

    const transaction = await contract.initiateTransaction(
      recipient,
      ethers.utils.parseEther(amount),
      reference,
      description
    ); // Replace with actual data
    await transaction.wait();
    alert("Transaction initiated!");

    // Redirect to QR Scanner Page after initiating the transaction
    navigate(`/qr-scanner?qrContent=${generateQRContent()}`);
  };

  // Function to generate the dynamic QR code content
  const generateQRContent = () => {
    // Add validation to ensure the amount is not empty
    if (!amount.trim()) {
      return "";
    }

    return JSON.stringify({
      recipient,
      amount: ethers.utils.parseEther(amount).toString(),
      reference,
      description,
    });
  };

  return (
    <div>
      <h1>Dynamic QR Page</h1>
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
        placeholder="Reference"
      />
      <br />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <br />
      <button onClick={initiateTransaction}>Initiate Transaction</button>
      <br />
      {generateQRContent() && <QRCode value={generateQRContent()} />} {/* Render QR Code */}
    </div>
  );
};

export default DynamicQRPage;
