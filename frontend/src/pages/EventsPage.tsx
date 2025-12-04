import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventAPI } from '../services/api';

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

const EventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'free' | 'paid'>('all');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const result = await eventAPI.getAllEvents();
      if (result.events) {
        setEvents(result.events);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterType === 'all' ? true :
      filterType === 'free' ? event.price === 0 :
      event.price > 0;

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF3E1]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#FF6D1F] mx-auto"></div>
          <p className="mt-4 text-[#222222] text-lg">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF3E1] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FF6D1F] to-[#222222] text-white p-8 rounded-lg shadow-lg mb-8">
          <h1 className="text-4xl font-bold mb-2">Browse Events</h1>
          <p className="text-lg text-white/90">Discover and register for exciting hackathons and events</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <svg
                  className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search events by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#F5E7C6] rounded-lg focus:border-[#FF6D1F] focus:outline-none"
                />
              </div>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  filterType === 'all'
                    ? 'bg-[#FF6D1F] text-white'
                    : 'bg-[#F5E7C6] text-[#222222] hover:bg-[#FF6D1F] hover:text-white'
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setFilterType('free')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  filterType === 'free'
                    ? 'bg-[#FF6D1F] text-white'
                    : 'bg-[#F5E7C6] text-[#222222] hover:bg-[#FF6D1F] hover:text-white'
                }`}
              >
                Free
              </button>
              <button
                onClick={() => setFilterType('paid')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  filterType === 'paid'
                    ? 'bg-[#FF6D1F] text-white'
                    : 'bg-[#F5E7C6] text-[#222222] hover:bg-[#FF6D1F] hover:text-white'
                }`}
              >
                Paid
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-[#222222] mb-2">No Events Found</h2>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? 'Try adjusting your search or filters'
                : 'No events are currently available. Check back later!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const availableSlots = event.capacity - event.registrations;
              const isFull = availableSlots <= 0;
              const eventDate = event.startDate
                ? new Date(event.startDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'TBA';

              return (
                <div
                  key={event._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => navigate(`/event/${event._id}`)}
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-[#FF6D1F] to-[#222222] text-white p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold flex-1 line-clamp-2">{event.title}</h3>
                      {isFull && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold ml-2">
                          FULL
                        </span>
                      )}
                    </div>
                    <p className="text-white/80 text-sm line-clamp-2 mb-4">
                      {event.description || 'Join us for an exciting event!'}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {eventDate}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Price:</span>
                      <span className="text-2xl font-bold text-[#FF6D1F]">
                        {event.price === 0 ? 'FREE' : `₹${event.price}`}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Registrations:</span>
                      <span className="font-semibold">{event.registrations} / {event.capacity}</span>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between mb-1 text-xs text-gray-600">
                        <span>Available Slots</span>
                        <span>{availableSlots}</span>
                      </div>
                      <div className="w-full bg-[#F5E7C6] rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#FF6D1F] to-[#222222] h-full transition-all duration-300"
                          style={{ width: `${Math.min((event.registrations / event.capacity) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button
                      className="w-full bg-[#222222] text-white py-3 rounded-lg hover:bg-[#FF6D1F] transition-colors font-semibold"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/event/${event._id}`);
                      }}
                    >
                      View Details & Register
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Results Count */}
        {filteredEvents.length > 0 && (
          <div className="mt-8 text-center text-gray-600">
            Showing {filteredEvents.length} of {events.length} events
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
