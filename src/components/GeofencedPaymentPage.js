// src/components/GeofencedPaymentPage.js
import React, { useState } from "react";
import { ethers } from "ethers";

const GeofencedPaymentPage = ({ contract }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const initiateTransaction = async () => {
    const transaction = await contract.initiateTransaction(recipient, ethers.utils.parseEther(amount)); // Replace with actual recipient address and amount
    await transaction.wait();
    alert("Transaction initiated!");
  };

  return (
    <div>
      <h1>Geofenced Payment Page</h1>
      <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Recipient Address" />
      <br />
      <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount (ETH)" />
      <button onClick={initiateTransaction}>Initiate Transaction</button>
    </div>
  );
};

export default GeofencedPaymentPage;
