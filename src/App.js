// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DigitalSpacePage from './components/DigitalSpacePage';
import DynamicQRPage from './components/DynamicQRPage';
import GeofencedPaymentPage from './components/GeofencedPaymentPage';
import ShortPaymentLinkPage from './components/ShortPaymentLinkPage';
import QRScannerPage from './components/QRScannerPage';
import PaymentPage from './components/PaymentPage';
import HomePage from './Home.js';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/digital-space">Digital Space</Link>
              </li>
              <li>
                <Link to="/dynamic-qr">Dynamic QR</Link>
              </li>
              <li>
                <Link to="/geofenced-payment">Geofenced Payment</Link>
              </li>
              <li>
                <Link to="/short-payment-link">Short Payment Link</Link>
              </li>
              <li>
                <Link to="/scanner-qr">QR Scanner</Link>
              </li>
              <li>
                <Link to="/payment-page">Payment Page</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/digital-space" element={<DigitalSpacePage />} />
            <Route path="/dynamic-qr" element={<DynamicQRPage />} />
            <Route path="/geofenced-payment" element={<GeofencedPaymentPage />} />
            <Route path="/short-payment-link" element={<ShortPaymentLinkPage />} />
            <Route path="/scanner-qr" element={<QRScannerPage />} />
            <Route path="/payment-page" element={<PaymentPage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
