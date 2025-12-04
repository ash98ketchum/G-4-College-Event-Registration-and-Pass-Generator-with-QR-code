import React, { useState, useEffect } from 'react';
import Scanner from '../components/Scanner';
import { verifyTicket, checkInTicket } from '../api/tickets';

interface TicketInfo {
  ticketNumber: string;
  event: {
    title: string;
    date: string;
    venue: string;
  };
  user: {
    name: string;
    email: string;
  };
  status: string;
  checkedInAt?: string;
}

const Scan: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [ticketInfo, setTicketInfo] = useState<TicketInfo | null>(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [scanHistory, setScanHistory] = useState<any[]>([]);
  const [manualTicketNumber, setManualTicketNumber] = useState('');

  const handleScanSuccess = async (decodedText: string) => {
    try {
      // The QR code should contain the ticket number
      await verifyAndCheckIn(decodedText);
    } catch (error) {
      console.error('Scan error:', error);
    }
  };

  const verifyAndCheckIn = async (ticketNumber: string) => {
    setMessage('🔍 Verifying ticket...');
    setMessageType('info');
    setTicketInfo(null);

    try {
      // First verify the ticket
      const verifyResponse = await verifyTicket(ticketNumber);
      const ticket = verifyResponse.data.ticket;

      if (!ticket) {
        setMessage('❌ Invalid ticket number');
        setMessageType('error');
        return;
      }

      setTicketInfo(ticket);

      // Check ticket status
      if (ticket.status === 'cancelled') {
        setMessage('❌ This ticket has been cancelled');
        setMessageType('error');
        return;
      }

      if (ticket.status === 'used') {
        setMessage(`⚠️ Ticket already used! Checked in at: ${new Date(ticket.checkedInAt).toLocaleString()}`);
        setMessageType('error');
        return;
      }

      // If ticket is valid, check it in
      const checkInResponse = await checkInTicket(ticketNumber);
      
      setMessage('✅ Ticket verified! Entry granted.');
      setMessageType('success');
      
      // Add to scan history
      setScanHistory(prev => [{
        ...ticket,
        scannedAt: new Date().toISOString(),
        success: true
      }, ...prev.slice(0, 19)]); // Keep last 20 scans

      // Auto clear after 3 seconds
      setTimeout(() => {
        setTicketInfo(null);
        setMessage('');
      }, 3000);

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Verification failed';
      setMessage(`❌ ${errorMessage}`);
      setMessageType('error');
      
      // Add to scan history as failed
      setScanHistory(prev => [{
        ticketNumber,
        scannedAt: new Date().toISOString(),
        success: false,
        error: errorMessage
      }, ...prev.slice(0, 19)]);
    }
  };

  const handleManualVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualTicketNumber.trim()) {
      verifyAndCheckIn(manualTicketNumber.trim());
      setManualTicketNumber('');
    }
  };

  return (
    <div className="scan-page">
      <header className="scan-header">
        <h1>🎫 Volunteer Scanner</h1>
        <p className="scan-subtitle">Scan attendee QR codes for event entry</p>
        <nav>
          <a href="/">← Back to Home</a>
        </nav>
      </header>

      <div className="scan-container">
        <div className="scan-main">
          {/* Scanner Section */}
          <div className="scanner-section">
            <div className="scanner-card">
              <h2>QR Code Scanner</h2>
              <Scanner 
                onScanSuccess={handleScanSuccess}
                onScanError={(error) => {
                  setMessage(`Scanner error: ${error}`);
                  setMessageType('error');
                }}
              />
            </div>

            {/* Manual Entry */}
            <div className="manual-entry-card">
              <h3>Manual Ticket Entry</h3>
              <form onSubmit={handleManualVerify}>
                <div className="manual-input-group">
                  <input
                    type="text"
                    placeholder="Enter ticket number"
                    value={manualTicketNumber}
                    onChange={(e) => setManualTicketNumber(e.target.value)}
                  />
                  <button type="submit" className="btn-verify">
                    🔍 Verify
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Verification Result */}
          {message && (
            <div className={`verification-result ${messageType}`}>
              <div className="result-icon">
                {messageType === 'success' && '✅'}
                {messageType === 'error' && '❌'}
                {messageType === 'info' && '🔍'}
              </div>
              <p className="result-message">{message}</p>
            </div>
          )}

          {/* Ticket Information */}
          {ticketInfo && (
            <div className={`ticket-info-card ${messageType}`}>
              <h3>Attendee Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>👤 Name:</label>
                  <span>{ticketInfo.user.name}</span>
                </div>
                <div className="info-item">
                  <label>📧 Email:</label>
                  <span>{ticketInfo.user.email}</span>
                </div>
                <div className="info-item">
                  <label>🎫 Ticket #:</label>
                  <span>{ticketInfo.ticketNumber}</span>
                </div>
                <div className="info-item">
                  <label>🎉 Event:</label>
                  <span>{ticketInfo.event.title}</span>
                </div>
                <div className="info-item">
                  <label>📅 Date:</label>
                  <span>{new Date(ticketInfo.event.date).toLocaleString()}</span>
                </div>
                <div className="info-item">
                  <label>📍 Venue:</label>
                  <span>{ticketInfo.event.venue}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scan History Sidebar */}
        <div className="scan-history">
          <h3>Recent Scans</h3>
          <div className="history-stats">
            <div className="stat">
              <span className="stat-value">{scanHistory.filter(s => s.success).length}</span>
              <span className="stat-label">✅ Successful</span>
            </div>
            <div className="stat">
              <span className="stat-value">{scanHistory.filter(s => !s.success).length}</span>
              <span className="stat-label">❌ Failed</span>
            </div>
          </div>
          <div className="history-list">
            {scanHistory.length === 0 ? (
              <p className="no-history">No scans yet</p>
            ) : (
              scanHistory.map((scan, index) => (
                <div key={index} className={`history-item ${scan.success ? 'success' : 'failed'}`}>
                  <div className="history-icon">
                    {scan.success ? '✅' : '❌'}
                  </div>
                  <div className="history-details">
                    {scan.success ? (
                      <>
                        <p className="history-name">{scan.user?.name}</p>
                        <p className="history-ticket">#{scan.ticketNumber}</p>
                      </>
                    ) : (
                      <>
                        <p className="history-name">Failed Scan</p>
                        <p className="history-ticket">#{scan.ticketNumber}</p>
                      </>
                    )}
                    <p className="history-time">
                      {new Date(scan.scannedAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          {scanHistory.length > 0 && (
            <button 
              className="btn-clear-history"
              onClick={() => setScanHistory([])}
            >
              Clear History
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scan;
