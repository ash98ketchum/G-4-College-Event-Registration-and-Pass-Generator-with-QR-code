import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ticketAPI } from '../services/api';

interface Ticket {
  _id: string;
  tid: string;
  eventId: {
    _id: string;
    title: string;
    description?: string;
    startDate?: string;
    endDate?: string;
  };
  userId: {
    _id: string;
    name: string;
    email: string;
    college?: string;
  };
  qrData: string;
  scanned: boolean;
  issuedAt: string;
  scannedAt?: string;
}

const MyTicketsPage = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      // Get current user - in production, get this from auth context
      const currentUser = localStorage.getItem('userId') || 'demo-user-id';
      const result = await ticketAPI.getUserTickets(currentUser);
      
      if (result.tickets) {
        setTickets(result.tickets);
      } else {
        setError('No tickets found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const viewTicket = (ticketId: string) => {
    navigate(`/ticket/${ticketId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF3E1]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#FF6D1F] mx-auto"></div>
          <p className="mt-4 text-[#222222] text-lg">Loading your tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF3E1] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-[#FF6D1F] text-white p-6 rounded-lg shadow-lg mb-6">
          <h1 className="text-4xl font-bold">My Tickets</h1>
          <p className="mt-2 text-lg">View and download your hackathon registration tickets</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Tickets Grid */}
        {tickets.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <svg
              className="w-24 h-24 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-[#222222] mb-2">No Tickets Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't registered for any events yet. Browse events and register to get your tickets!
            </p>
            <button
              onClick={() => navigate('/events')}
              className="bg-[#FF6D1F] text-white px-6 py-3 rounded-lg hover:bg-[#e55d0f] transition-colors"
            >
              Browse Events
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Ticket Header */}
                <div className="bg-[#F5E7C6] p-4 border-b-2 border-dashed border-[#FF6D1F]">
                  <h3 className="font-bold text-xl text-[#222222] truncate">
                    {ticket.eventId?.title || 'Event'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Ticket ID: {ticket.tid.substring(0, 8)}...
                  </p>
                </div>

                {/* Ticket Body */}
                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Attendee</p>
                    <p className="font-semibold text-[#222222]">{ticket.userId?.name}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Issued Date</p>
                    <p className="text-sm text-[#222222]">
                      {new Date(ticket.issuedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  {ticket.eventId?.startDate && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Event Date</p>
                      <p className="text-sm text-[#222222]">
                        {new Date(ticket.eventId.startDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="pt-2">
                    {ticket.scanned ? (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">
                        ✓ Checked In
                      </span>
                    ) : (
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
                        Valid
                      </span>
                    )}
                  </div>
                </div>

                {/* Ticket Actions */}
                <div className="p-4 bg-[#FAF3E1] border-t-2 border-[#F5E7C6]">
                  <button
                    onClick={() => viewTicket(ticket._id)}
                    className="w-full bg-[#FF6D1F] text-white py-2 rounded-lg hover:bg-[#e55d0f] transition-colors font-semibold"
                  >
                    View & Download Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Instructions */}
        {tickets.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-[#222222] mb-3">Instructions:</h3>
            <ul className="list-disc list-inside space-y-2 text-[#222222]">
              <li>Click "View & Download Ticket" to see your full hall ticket</li>
              <li>Download the PDF for your records</li>
              <li>Show the QR code at the venue gate for entry</li>
              <li>Each ticket can only be scanned once for security</li>
              <li>Arrive early to avoid queues at the gate</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTicketsPage;
