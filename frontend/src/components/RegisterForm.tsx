import React, { useState, useEffect } from 'react';
import { getAllEvents } from '../api/events';
import { registerForEvent } from '../api/tickets';

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await getAllEvents({ isActive: true });
      setEvents(response.data.events);
    } catch (error) {
      console.error('Failed to load events:', error);
      setMessage('Failed to load events. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEvent) {
      setMessage('Please select an event');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await registerForEvent(selectedEvent);
      setMessage('✅ Registration successful! Your ticket with QR code has been generated.');
      setSelectedEvent('');
      if (onSuccess) {
        setTimeout(() => onSuccess(), 1500);
      }
    } catch (error: any) {
      setMessage(`❌ ${error.response?.data?.message || 'Registration failed. Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form-container">
      <div className="register-form-card">
        <h2>🎟️ Event Registration</h2>
        <p className="form-subtitle">Register for an event and get your digital pass with QR code</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="event">Select Event *</label>
            <select
              id="event"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              required
              disabled={loading}
            >
              <option value="">-- Choose an event --</option>
              {events.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.title} - {new Date(event.date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          {selectedEvent && (
            <div className="event-preview">
              {events.find(e => e._id === selectedEvent) && (
                <>
                  <h4>{events.find(e => e._id === selectedEvent)?.title}</h4>
                  <p>📅 {new Date(events.find(e => e._id === selectedEvent)?.date).toLocaleString()}</p>
                  <p>📍 {events.find(e => e._id === selectedEvent)?.venue}</p>
                  <p>👥 Capacity: {events.find(e => e._id === selectedEvent)?.capacity}</p>
                </>
              )}
            </div>
          )}

          {message && (
            <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <button 
            type="submit" 
            className="btn-submit"
            disabled={loading || !selectedEvent}
          >
            {loading ? 'Registering...' : '🎫 Register & Generate QR Code'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
