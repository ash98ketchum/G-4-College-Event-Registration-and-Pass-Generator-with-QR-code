import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface ScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScanSuccess, onScanError }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [cameras, setCameras] = useState<any[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Get available cameras
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          setCameras(devices);
          // Prefer back camera if available
          const backCamera = devices.find(device => 
            device.label.toLowerCase().includes('back') || 
            device.label.toLowerCase().includes('rear')
          );
          setSelectedCamera(backCamera?.id || devices[0].id);
        } else {
          setError('No cameras found on this device');
        }
      })
      .catch((err) => {
        console.error('Error getting cameras:', err);
        setError('Unable to access camera. Please check permissions.');
      });

    return () => {
      stopScanning();
    };
  }, []);

  const startScanning = async () => {
    if (!selectedCamera) {
      setError('Please select a camera');
      return;
    }

    try {
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;

      await scanner.start(
        selectedCamera,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          onScanSuccess(decodedText);
          // Optional: stop scanning after successful scan
          // stopScanning();
        },
        (errorMessage) => {
          // Ignore continuous scan errors
          // console.log(errorMessage);
        }
      );

      setIsScanning(true);
      setError('');
    } catch (err: any) {
      console.error('Error starting scanner:', err);
      setError(`Failed to start scanner: ${err.message || 'Unknown error'}`);
      if (onScanError) {
        onScanError(err.message);
      }
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
        setIsScanning(false);
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
  };

  const handleCameraChange = async (cameraId: string) => {
    if (isScanning) {
      await stopScanning();
    }
    setSelectedCamera(cameraId);
  };

  return (
    <div className="scanner-container">
      <div className="scanner-controls">
        {cameras.length > 1 && (
          <div className="camera-select">
            <label htmlFor="camera">Select Camera:</label>
            <select
              id="camera"
              value={selectedCamera}
              onChange={(e) => handleCameraChange(e.target.value)}
              disabled={isScanning}
            >
              {cameras.map((camera) => (
                <option key={camera.id} value={camera.id}>
                  {camera.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="scanner-buttons">
          {!isScanning ? (
            <button className="btn-start-scan" onClick={startScanning}>
              📷 Start Scanning
            </button>
          ) : (
            <button className="btn-stop-scan" onClick={stopScanning}>
              ⏹️ Stop Scanning
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="scanner-error">
          <p>⚠️ {error}</p>
        </div>
      )}

      <div id="qr-reader" className="qr-reader"></div>

      {isScanning && (
        <div className="scanning-indicator">
          <div className="pulse"></div>
          <p>📱 Position QR code within the frame</p>
        </div>
      )}
    </div>
  );
};

export default Scanner;
