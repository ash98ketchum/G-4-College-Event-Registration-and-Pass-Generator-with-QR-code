import React, { useEffect, useState } from 'react';
import { getUserTickets } from '../api/tickets';
import RegisterForm from '../components/RegisterForm';

const Register: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const response = await getUserTickets();
      setTickets(response.data.tickets);
    } catch (error) {
      console.error('Failed to load tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationSuccess = () => {
    setShowForm(false);
    loadTickets();
  };

  const downloadQRCode = (ticket: any) => {
    const link = document.createElement('a');
    link.href = ticket.qrCode;
    link.download = `ticket-${ticket.ticketNumber}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printTicket = (ticket: any) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Event Ticket - ${ticket.ticketNumber}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 40px;
                text-align: center;
                background: #FAF3E1;
              }
              .ticket {
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                max-width: 500px;
                margin: 0 auto;
              }
              h1 { color: #FF6D1F; margin-bottom: 10px; }
              h2 { color: #222222; margin-top: 0; }
              .qr-code { margin: 30px 0; }
              .qr-code img { max-width: 300px; }
              .details { text-align: left; margin: 20px 0; }
              .details p { margin: 10px 0; color: #222222; }
              .ticket-number { 
                font-size: 20px; 
                font-weight: bold; 
                color: #FF6D1F; 
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="ticket">
              <h1>🎟️ EVENT TICKET</h1>
              <h2>${ticket.event.title}</h2>
              <div class="ticket-number">Ticket #${ticket.ticketNumber}</div>
              <div class="qr-code">
                <img src="${ticket.qrCode}" alt="QR Code" />
              </div>
              <div class="details">
                <p><strong>📅 Date:</strong> ${new Date(ticket.event.date).toLocaleString()}</p>
                <p><strong>📍 Venue:</strong> ${ticket.event.venue}</p>
                <p><strong>✅ Status:</strong> ${ticket.status.toUpperCase()}</p>
              </div>
              <p style="margin-top: 30px; font-size: 12px; color: #666;">
                Please show this QR code at the event entrance
              </p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (loading) {
    return <div className="loading">Loading your tickets...</div>;
  }

  return (
    <div className="register-page">
      <header className="page-header">
        <h1>🎉 Event Registration & Tickets</h1>
        <nav>
          <a href="/events">Browse Events</a>
          <a href="/scan">Scanner</a>
          {localStorage.getItem('token') && (
            <button onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}>Logout</button>
          )}
        </nav>
      </header>

      <div className="register-container">
        <div className="register-actions">
          <button 
            className="btn-register" 
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '📋 View My Tickets' : '➕ Register for New Event'}
          </button>
        </div>

        {showForm ? (
          <RegisterForm onSuccess={handleRegistrationSuccess} />
        ) : (
          <div className="tickets-section">
            <h2>My Event Tickets</h2>
            {tickets.length === 0 ? (
              <div className="no-tickets">
                <div className="empty-state">
                  <div className="empty-icon">🎫</div>
                  <h3>No tickets yet!</h3>
                  <p>Register for an event to get your digital pass with QR code</p>
                  <button className="btn-primary" onClick={() => setShowForm(true)}>
                    Register Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="tickets-grid">
                {tickets.map((ticket) => (
                  <div key={ticket._id} className="ticket-card">
                    <div className="ticket-card-header">
                      <h3>{ticket.event.title}</h3>
                      <span className={`status-badge ${ticket.status}`}>
                        {ticket.status === 'confirmed' && '✅'}
                        {ticket.status === 'used' && '✓'}
                        {ticket.status === 'cancelled' && '❌'}
                        {ticket.status === 'pending' && '⏳'}
                        {' '}{ticket.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="ticket-info">
                      <p><strong>📅 Date:</strong> {new Date(ticket.event.date).toLocaleString()}</p>
                      <p><strong>📍 Venue:</strong> {ticket.event.venue}</p>
                      <p><strong>🎟️ Ticket #:</strong> {ticket.ticketNumber}</p>
                    </div>

                    {ticket.status === 'confirmed' && (
                      <>
                        <div className="ticket-qr" onClick={() => setSelectedTicket(ticket)}>
                          <img src={ticket.qrCode} alt="QR Code" />
                          <p className="qr-hint">Click to view full size</p>
                        </div>

                        <div className="ticket-actions">
                          <button 
                            className="btn-download"
                            onClick={() => downloadQRCode(ticket)}
                          >
                            📥 Download QR
                          </button>
                          <button 
                            className="btn-print"
                            onClick={() => printTicket(ticket)}
                          >
                            🖨️ Print Ticket
                          </button>
                        </div>
                      </>
                    )}

                    {ticket.checkedInAt && (
                      <div className="check-in-info">
                        <p>✅ Checked in at: {new Date(ticket.checkedInAt).toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {selectedTicket && (
        <div className="modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedTicket(null)}>
              ✕
            </button>
            <h2>{selectedTicket.event.title}</h2>
            <p className="ticket-number">Ticket #{selectedTicket.ticketNumber}</p>
            <div className="modal-qr">
              <img src={selectedTicket.qrCode} alt="QR Code" />
            </div>
            <p className="modal-instructions">
              Show this QR code to the volunteer at the event entrance
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
