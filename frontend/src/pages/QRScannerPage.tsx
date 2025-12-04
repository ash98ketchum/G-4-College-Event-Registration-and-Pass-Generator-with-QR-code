import { useState, useRef } from 'react';
import { ticketAPI } from '../services/api';

const QRScannerPage = () => {
  const [scanResult, setScanResult] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [manualToken, setManualToken] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');
    setScanResult(null);

    try {
      // In a real app, you'd decode the QR from the image
      // For now, we'll use manual token input
      const reader = new FileReader();
      reader.onload = async () => {
        // Simulating QR decode - in production use a QR decoder library
        alert('Please use manual token input for now. QR image scanning requires additional setup.');
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to read QR code from image');
      setLoading(false);
    }
  };

  const handleManualValidation = async () => {
    if (!manualToken.trim()) {
      setError('Please enter a token');
      return;
    }

    setLoading(true);
    setError('');
    setScanResult(null);

    try {
      const result = await ticketAPI.validateTicket(manualToken);
      
      if (result.result === 'allowed') {
        setScanResult({
          status: 'success',
          message: 'Ticket validated successfully! Entry allowed.',
          data: result,
        });
        // Auto download PDF
        setTimeout(() => {
          window.print();
        }, 500);
      } else if (result.result === 'duplicate') {
        setScanResult({
          status: 'duplicate',
          message: 'This ticket has already been scanned!',
          data: result,
        });
      } else {
        setError('Invalid ticket');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to validate ticket');
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setError('');
    setManualToken('');
  };

  return (
    <div className="min-h-screen bg-[#FAF3E1] p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-[#FF6D1F] text-white p-6 rounded-t-lg">
          <h1 className="text-3xl font-bold text-center">QR Code Scanner</h1>
          <p className="text-center mt-2">Volunteer Gate Entry System</p>
        </div>

        <div className="bg-white shadow-lg rounded-b-lg p-8">
          {!scanResult ? (
            <>
              {/* Scanner Interface */}
              <div className="space-y-6">
                <div className="border-4 border-dashed border-[#F5E7C6] rounded-lg p-8 text-center">
                  <div className="mb-4">
                    <svg
                      className="w-24 h-24 mx-auto text-[#FF6D1F]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-[#222222] mb-4">
                    Scan QR Code
                  </h2>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-[#FF6D1F] text-white px-6 py-3 rounded-lg hover:bg-[#e55d0f] transition-colors"
                  >
                    Upload QR Code Image
                  </button>
                </div>

                {/* Manual Token Input */}
                <div className="border-t-2 border-[#F5E7C6] pt-6">
                  <h3 className="text-lg font-semibold text-[#222222] mb-4">
                    Or Enter Token Manually
                  </h3>
                  <div className="space-y-4">
                    <textarea
                      value={manualToken}
                      onChange={(e) => setManualToken(e.target.value)}
                      placeholder="Paste the ticket token here..."
                      className="w-full p-4 border-2 border-[#F5E7C6] rounded-lg focus:border-[#FF6D1F] focus:outline-none"
                      rows={4}
                    />
                    <button
                      onClick={handleManualValidation}
                      disabled={loading}
                      className="w-full bg-[#222222] text-white py-3 rounded-lg hover:bg-[#333333] transition-colors disabled:bg-gray-400"
                    >
                      {loading ? 'Validating...' : 'Validate Ticket'}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    <p className="font-semibold">Error:</p>
                    <p>{error}</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Scan Result */}
              <div className="space-y-6">
                {scanResult.status === 'success' ? (
                  <div className="bg-green-100 border-4 border-green-500 rounded-lg p-8 text-center">
                    <div className="mb-4">
                      <svg
                        className="w-24 h-24 mx-auto text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-green-700 mb-2">
                      ✓ ENTRY ALLOWED
                    </h2>
                    <p className="text-xl text-green-600">{scanResult.message}</p>
                    {scanResult.data && (
                      <div className="mt-6 bg-white rounded-lg p-4 text-left">
                        <p className="text-sm text-gray-600">
                          <strong>Ticket ID:</strong> {scanResult.data.ticketId}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>User ID:</strong> {scanResult.data.userId}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Scanned At:</strong> {new Date().toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-red-100 border-4 border-red-500 rounded-lg p-8 text-center">
                    <div className="mb-4">
                      <svg
                        className="w-24 h-24 mx-auto text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-red-700 mb-2">
                      ✗ ENTRY DENIED
                    </h2>
                    <p className="text-xl text-red-600">{scanResult.message}</p>
                    {scanResult.data?.scannedAt && (
                      <div className="mt-6 bg-white rounded-lg p-4 text-left">
                        <p className="text-sm text-gray-600">
                          <strong>Previously Scanned At:</strong>{' '}
                          {new Date(scanResult.data.scannedAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={resetScanner}
                  className="w-full bg-[#FF6D1F] text-white py-3 rounded-lg hover:bg-[#e55d0f] transition-colors"
                >
                  Scan Next Ticket
                </button>
              </div>
            </>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-[#F5E7C6] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#222222] mb-3">
            Instructions for Volunteers:
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[#222222]">
            <li>Ask attendees to show their QR code from their ticket</li>
            <li>Upload the QR code image or enter the token manually</li>
            <li>Green checkmark = Allow entry</li>
            <li>Red cross = Deny entry (already scanned or invalid)</li>
            <li>Each ticket can only be scanned once</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QRScannerPage;
