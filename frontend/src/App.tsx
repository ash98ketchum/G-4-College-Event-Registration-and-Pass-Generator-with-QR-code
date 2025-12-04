import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Scan from './pages/Scan';
import EventCard from './components/EventCard';
import { getAllEvents } from './api/events';
import { registerForEvent, getUserTickets } from './api/tickets';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/my-tickets" element={<MyTicketsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [userTickets, setUserTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
    loadUserTickets();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await getAllEvents({ isActive: true });
      setEvents(response.data.events);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserTickets = async () => {
    try {
      const response = await getUserTickets();
      setUserTickets(response.data.tickets);
    } catch (error) {
      console.error('Failed to load tickets:', error);
    }
  };

  const handleRegister = async (eventId: string) => {
    try {
      await registerForEvent(eventId);
      alert('Registration successful! Check your email for the ticket.');
      loadUserTickets();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  const isRegistered = (eventId: string) => {
    return userTickets.some((ticket) => ticket.event._id === eventId);
  };

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  return (
    <div className="events-page">
      <header className="page-header">
        <h1>🎉 Available Events</h1>
        <nav>
          <a href="/my-tickets">My Tickets</a>
          <button onClick={() => {
            localStorage.clear();
            window.location.href = '/';
          }}>Logout</button>
        </nav>
      </header>

      <div className="events-container">
        {events.length === 0 ? (
          <div className="no-events">
            <p>No events available at the moment.</p>
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onRegister={handleRegister}
                isRegistered={isRegistered(event._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MyTicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="loading">Loading tickets...</div>;
  }

  return (
    <div className="tickets-page">
      <header className="page-header">
        <h1>🎫 My Tickets</h1>
        <nav>
          <a href="/events">Browse Events</a>
          <button onClick={() => {
            localStorage.clear();
            window.location.href = '/';
          }}>Logout</button>
        </nav>
      </header>

      <div className="tickets-container">
        {tickets.length === 0 ? (
          <div className="no-tickets">
            <p>You haven't registered for any events yet.</p>
            <a href="/events" className="btn-browse">Browse Events</a>
          </div>
        ) : (
          <div className="tickets-grid">
            {tickets.map((ticket) => (
              <div key={ticket._id} className="ticket-card">
                <div className="ticket-header">
                  <h3>{ticket.event.title}</h3>
                  <span className={`status-badge ${ticket.status}`}>
                    {ticket.status}
                  </span>
                </div>
                
                <div className="ticket-details">
                  <p><strong>📅 Date:</strong> {new Date(ticket.event.date).toLocaleString()}</p>
                  <p><strong>📍 Venue:</strong> {ticket.event.venue}</p>
                  <p><strong>🎟️ Ticket #:</strong> {ticket.ticketNumber}</p>
                </div>

                <div className="ticket-qr">
                  <img src={ticket.qrCode} alt="QR Code" />
                  <p className="qr-instructions">Show this QR code at the event entrance</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
