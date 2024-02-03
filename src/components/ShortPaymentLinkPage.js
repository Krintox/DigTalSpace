// src/components/ShortPaymentLinkPage.js
import React, { useState } from "react";
import { ethers } from "ethers";

const ShortPaymentLinkPage = ({ contract }) => {
  const [link, setLink] = useState("");
  const [amount, setAmount] = useState("");

  const createLink = async () => {
    const transaction = await contract.createLink(link, ethers.constants.AddressZero); // Replace with actual recipient
    await transaction.wait();
    alert("Link created!");
  };

  const getRecipient = async () => {
    const recipient = await contract.getRecipient(link);
    alert(`Recipient: ${recipient}`);
  };

  const initiateTransaction = async () => {
    const transaction = await contract.initiateTransaction(link, ethers.utils.parseEther(amount)); // Use link as recipient for simplicity; replace with actual link and amount
    await transaction.wait();
    alert("Transaction initiated!");
  };

  return (
    <div>
      <h1>Short Payment Link Page</h1>
      <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" />
      <button onClick={createLink}>Create Link</button>
      <button onClick={getRecipient}>Get Recipient</button>
      <br />
      <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount (ETH)" />
      <button onClick={initiateTransaction}>Initiate Transaction</button>
    </div>
  );
};

export default ShortPaymentLinkPage;
