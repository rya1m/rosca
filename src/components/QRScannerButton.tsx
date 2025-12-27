import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRScannerButton = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const qrCodeScannerRef = useRef<Html5Qrcode | null>(null);

  const startScanner = async () => {
    setScanning(true);

    if (!scannerRef.current) return;

    const qrScanner = new Html5Qrcode("qr-scanner");
    qrCodeScannerRef.current = qrScanner;

    try {
      await qrScanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          console.log("✅ QR code scanned:", decodedText);
          setResult(decodedText);
          qrScanner.stop(); // stop camera
          setScanning(false);
        },
        (errorMessage) => {
          // Ignore scan errors
        }
      );
    } catch (err) {
      console.error("❌ Failed to start QR scanner:", err);
      setScanning(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <button
        onClick={startScanner}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#1d4ed8',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Scan QR
      </button>

      {scanning && <div id="qr-scanner" ref={scannerRef} style={{ marginTop: '1rem' }}></div>}

      {result && (
        <div style={{ marginTop: '1rem', background: '#eee', padding: '1rem', borderRadius: '6px' }}>
          <strong>Result:</strong>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default QRScannerButton;
