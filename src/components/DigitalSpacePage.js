// src/components/DigitalSpacePage.js
import React, { useState } from "react";
import { ethers } from "ethers";

const DigitalSpacePage = ({ contract }) => {
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState("");

  const allowUser = async () => {
    const transaction = await contract.allowUser(user); // Replace with actual user address
    await transaction.wait();
    alert("User allowed!");
  };

  const disallowUser = async () => {
    const transaction = await contract.disallowUser(user); // Replace with actual user address
    await transaction.wait();
    alert("User disallowed!");
  };

  const initiateTransaction = async () => {
    const transaction = await contract.initiateTransaction(user, ethers.utils.parseEther(amount)); // Replace with actual user address and amount
    await transaction.wait();
    alert("Transaction initiated!");
  };

  return (
    <div>
      <h1>Digital Space Page</h1>
      <input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder="User Address" />
      <button onClick={allowUser}>Allow User</button>
      <button onClick={disallowUser}>Disallow User</button>
      <br />
      <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount (ETH)" />
      <button onClick={initiateTransaction}>Initiate Transaction</button>
    </div>
  );
};

export default DigitalSpacePage;
