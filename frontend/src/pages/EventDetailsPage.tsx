import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventAPI, ticketAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Event {
  _id: string;
  title: string;
  description?: string;
  price: number;
  capacity: number;
  registrations: number;
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (id) {
      loadEventDetails();
    }
  }, [id]);

  const loadEventDetails = async () => {
    try {
      const result = await eventAPI.getEventById(id!);
      if (result.event) {
        setEvent(result.event);
        // Try to load stats (may fail if not authenticated)
        try {
          const statsResult = await eventAPI.getEventStats(id!);
          setStats(statsResult);
        } catch (e) {
          // Stats not available for public users
        }
      } else {
        setError('Event not found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load event');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseTicket = async () => {
    if (!event) return;

    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      alert('Please login to purchase tickets');
      navigate('/login', { state: { from: location } });
      return;
    }

    setPurchasing(true);
    setError('');

    try {
      const result = await ticketAPI.createTicket(user.id, event._id);
      
      if (result.ticket) {
        alert('Ticket purchased successfully! Check your tickets page.');
        navigate(`/ticket/${result.ticket._id}`);
      } else {
        setError(result.message || 'Failed to purchase ticket');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to purchase ticket');
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF3E1]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#FF6D1F] mx-auto"></div>
          <p className="mt-4 text-[#222222] text-lg">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF3E1] p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <svg
            className="w-16 h-16 mx-auto text-red-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-[#222222] mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/events')}
            className="bg-[#FF6D1F] text-white px-6 py-3 rounded-lg hover:bg-[#e55d0f] transition-colors"
          >
            Browse Events
          </button>
        </div>
      </div>
    );
  }

  if (!event) return null;

  const availableSlots = event.capacity - event.registrations;
  const isFull = availableSlots <= 0;
  const eventDate = event.startDate
    ? new Date(event.startDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'TBA';

  return (
    <div className="min-h-screen bg-[#FAF3E1] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/events')}
          className="mb-6 flex items-center gap-2 text-[#222222] hover:text-[#FF6D1F] transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Events
        </button>

        {/* Event Header */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-[#FF6D1F] to-[#222222] text-white p-8 md:p-12">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
                {event.description && (
                  <p className="text-xl text-white/90 mb-6">{event.description}</p>
                )}
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <span className="font-semibold">📅 Date:</span> {eventDate}
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <span className="font-semibold">💰 Price:</span> ₹{event.price}
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <span className="font-semibold">👥 Capacity:</span> {event.capacity}
                  </div>
                </div>
              </div>
              
              {isFull && (
                <div className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold">
                  SOLD OUT
                </div>
              )}
            </div>
          </div>

          {/* Event Details */}
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#222222] mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-[#FF6D1F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Event Information
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between py-2 border-b border-[#F5E7C6]">
                      <span className="font-semibold">Total Registrations:</span>
                      <span>{event.registrations}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#F5E7C6]">
                      <span className="font-semibold">Available Slots:</span>
                      <span className={availableSlots > 10 ? 'text-green-600' : 'text-red-600'}>
                        {availableSlots}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#F5E7C6]">
                      <span className="font-semibold">Event Type:</span>
                      <span>Hackathon</span>
                    </div>
                    {stats && (
                      <>
                        <div className="flex justify-between py-2 border-b border-[#F5E7C6]">
                          <span className="font-semibold">Total Tickets:</span>
                          <span>{stats.totalTickets}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-[#F5E7C6]">
                          <span className="font-semibold">Checked In:</span>
                          <span>{stats.scannedTickets}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="font-semibold">Registration Progress</span>
                    <span>{Math.round((event.registrations / event.capacity) * 100)}%</span>
                  </div>
                  <div className="w-full bg-[#F5E7C6] rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#FF6D1F] to-[#222222] h-full transition-all duration-300"
                      style={{ width: `${Math.min((event.registrations / event.capacity) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Purchase Card */}
              <div className="bg-[#FAF3E1] rounded-lg p-6 border-2 border-[#FF6D1F]">
                <h3 className="text-2xl font-bold text-[#222222] mb-4">Register Now</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Ticket Price:</span>
                    <span className="text-2xl font-bold text-[#FF6D1F]">₹{event.price}</span>
                  </div>
                  
                  {event.price > 0 && (
                    <>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Platform Fee:</span>
                        <span>₹0</span>
                      </div>
                      <div className="border-t-2 border-[#FF6D1F] pt-2 flex justify-between text-xl font-bold">
                        <span>Total:</span>
                        <span className="text-[#FF6D1F]">₹{event.price}</span>
                      </div>
                    </>
                  )}
                </div>

                {error && (
                  <div className="mb-4 bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  onClick={handlePurchaseTicket}
                  disabled={purchasing || isFull}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
                    isFull
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-[#FF6D1F] text-white hover:bg-[#e55d0f]'
                  } disabled:bg-gray-400`}
                >
                  {purchasing ? 'Processing...' : isFull ? 'Event Full' : `Purchase Ticket for ₹${event.price}`}
                </button>

                <p className="mt-4 text-xs text-gray-600 text-center">
                  Your ticket will be generated instantly with a QR code
                </p>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-[#F5E7C6] rounded-lg p-6">
              <h3 className="text-xl font-bold text-[#222222] mb-4">What's Included:</h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {[
                  'Digital Hall Ticket with QR Code',
                  'Event Entry Pass',
                  'Certificate of Participation',
                  'Networking Opportunities',
                  'Learning Resources',
                  'Refreshments',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-[#222222]">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-[#222222] mb-4">Important Notes:</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-[#FF6D1F] font-bold">•</span>
              <span>After purchasing, you'll receive a digital hall ticket with a unique QR code</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF6D1F] font-bold">•</span>
              <span>Present the QR code at the venue for entry verification</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF6D1F] font-bold">•</span>
              <span>Each ticket can only be scanned once for security</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF6D1F] font-bold">•</span>
              <span>Please arrive 30 minutes before the event starts</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
