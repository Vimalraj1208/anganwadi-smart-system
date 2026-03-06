import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = () => {

  const scannerRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {

    if (startedRef.current) return;

    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    scanner.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 220, height: 220 }
      },
      (decodedText) => {

        console.log("QR:", decodedText);

      }
    );

    startedRef.current = true;

    return () => {

      if (scannerRef.current && startedRef.current) {

        scannerRef.current.stop()
          .then(() => {
            scannerRef.current.clear();
            startedRef.current = false;
          })
          .catch(() => {});

      }

    };

  }, []);

return (

<div className="scanner-container">

<h2 className="scanner-title">Scan Student QR</h2>

<div className="scanner-card">

<div id="qr-reader"></div>

<div className="scanner-line"></div>

</div>

</div>

);

};

export default QRScanner;