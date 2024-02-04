// QRScannerPage.js
import React, { useState } from "react";
import jsQR from "jsqr";
import { ethers } from "ethers";

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
        handlePayment(code.data);
      } else {
        setQrContent("QR code not found");
      }
    };
  };

  const handlePayment = async (qrData) => {
    try {
      const { recipient, amount } = JSON.parse(decodeURIComponent(qrData));
      console.log(recipient);
      console.log(amount);
  
      // Assuming you have a contract with a pay function
      const contractAddress = "0x7ae0Cbc6503ddE8344B95F100a3e01A98f6087bB"; // Replace with the actual contract address
      const contractABI = [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            }
          ],
          "name": "pay",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "PaymentSent",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "balances",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
  
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      // Convert amount to Wei
      const amountWei = ethers.utils.parseEther(amount);
  
      // Specify gas limit and gas price
      const options = { value: amountWei, gasLimit: 300000, gasPrice: ethers.utils.parseUnits("20", "gwei") };
  
      // Wait for MetaMask to prompt user for transaction confirmation
      await contract.pay(recipient, options);
  
      alert(`Payment of ${amount} ETH to ${recipient} initiated!`);
    } catch (error) {
      console.error("Error handling payment:", error);
    }
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

      {/* {qrContent && <p>Scanned QR Content: {qrContent}</p>} */}
    </div>
  );
};

export default QRScannerPage;
