import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Users,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import FloatingOrbs from '../components/FloatingOrbs';
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

const AdminDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    capacity: 0,
    startDate: '',
    endDate: '',
  });

  // Fetch events from API
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventAPI.getAllEvents();
      if (response.data) {
        setEvents(response.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await eventAPI.createEvent(formData);
      if (response.data) {
        setEvents([...events, response.data]);
        setShowCreateModal(false);
        setFormData({
          title: '',
          description: '',
          price: 0,
          capacity: 0,
          startDate: '',
          endDate: '',
        });
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await eventAPI.deleteEvent(id);
      setEvents(events.filter((e) => e._id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const totalRegistrations = events.reduce(
    (sum, event) => sum + (event.registrations || 0),
    0,
  );
  const totalCheckins = events.reduce(
    (sum, event) => sum + (event.registrations || 0),
    0,
  );
  const totalRevenue = events.reduce(
    (sum, event) => sum + (event.registrations || 0) * event.price,
    0,
  );
  const totalCapacity = events.reduce((sum, event) => sum + event.capacity, 0);
  const capacityUsed = totalCapacity > 0 ? Math.round(
    (totalRegistrations / totalCapacity) * 100,
  ) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF3E1] via-[#F5E7C6] to-[#FF6D1F33] relative text-[#222222]">
      <FloatingOrbs />

      <Sidebar />
      <Navbar />

      <main className="ml-64 pt-24 px-8 pb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#222222] mb-2">
            Dashboard Overview
          </h1>
          <p className="text-[#555555]">
            Welcome back! Here&apos;s what&apos;s happening with your
            events.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Registrations" value={totalRegistrations} icon={Users} delay={0} />
          <StatCard title="Total Check-ins" value={totalCheckins} icon={CheckCircle} delay={0.1} />
          <StatCard
            title="Revenue"
            value={totalRevenue}
            icon={DollarSign}
            prefix="$"
            delay={0.2}
          />
          <StatCard
            title="Capacity Used"
            value={capacityUsed}
            icon={TrendingUp}
            suffix="%"
            delay={0.3}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="backdrop-blur-xl bg-white/70 rounded-2xl border border-[#F5E7C6] p-6 relative overflow-hidden shadow-lg"
          >
            <h2 className="text-xl font-bold text-[#222222] mb-4">
              Registrations vs Check-ins Over Time
            </h2>

            <div className="h-64 flex items-end justify-between gap-2">
              {[85, 92, 78, 95, 88, 96, 90, 94, 89, 97, 93, 98].map(
                (value, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${value}%` }}
                    transition={{
                      delay: 0.6 + index * 0.05,
                      duration: 0.5,
                    }}
                    className="flex-1 bg-gradient-to-t from-[#FF6D1F] to-[#F5E7C6] rounded-t-lg relative group"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#222222] text-[#FAF3E1] text-xs px-2 py-1 rounded whitespace-nowrap">
                      {value}%
                    </div>
                  </motion.div>
                ),
              )}
            </div>

            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#FF6D1F] rounded-full" />
                <span className="text-[#555555] text-sm">Registrations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#222222] rounded-full" />
                <span className="text-[#555555] text-sm">Check-ins</span>
              </div>
            </div>

            <motion.div
              animate={{
                background: [
                  'linear-gradient(90deg, transparent, rgba(255,109,31,0.08), transparent)',
                  'linear-gradient(90deg, transparent, rgba(255,109,31,0.16), transparent)',
                  'linear-gradient(90deg, transparent, rgba(255,109,31,0.08), transparent)',
                ],
                x: [-300, 300],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 pointer-events-none"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="backdrop-blur-xl bg-white/70 rounded-2xl border border-[#F5E7C6] p-6 relative overflow-hidden shadow-lg"
          >
            <h2 className="text-xl font-bold text-[#222222] mb-4">
              Revenue by Event
            </h2>

            <div className="space-y-4">
              {events.slice(0, 5).map((event, index) => {
                const revenue = event.registrations * event.price;
                const percentage = (revenue / totalRevenue) * 100;

                return (
                  <div key={event.id}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#555555]">
                        {event.name}
                      </span>
                      <span className="text-[#222222] font-bold">
                        ${revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full h-3 bg-[#F5E7C6] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{
                          delay: 0.7 + index * 0.1,
                          duration: 0.8,
                        }}
                        className="h-full bg-gradient-to-r from-[#FF6D1F] via-[#FF9148] to-[#222222] rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <motion.div
              animate={{
                background: [
                  'linear-gradient(90deg, transparent, rgba(34,34,34,0.06), transparent)',
                  'linear-gradient(90deg, transparent, rgba(34,34,34,0.12), transparent)',
                  'linear-gradient(90deg, transparent, rgba(34,34,34,0.06), transparent)',
                ],
                x: [-300, 300],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                delay: 1,
              }}
              className="absolute inset-0 pointer-events-none"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="backdrop-blur-xl bg-white/80 rounded-2xl border border-[#F5E7C6] overflow-hidden shadow-lg"
        >
          <div className="p-6 flex items-center justify-between border-b border-[#F5E7C6]">
            <div>
              <h2 className="text-2xl font-bold text-[#222222] mb-1">
                Event Management
              </h2>
              <p className="text-[#555555]">
                Manage all your events in one place
              </p>
            </div>
            <motion.button
              onClick={() => setShowCreateModal(true)}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  '0 0 30px rgba(255,109,31,0.6)',
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-[#FF6D1F] to-[#FF9148] rounded-xl text-white font-bold flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Create Event
            </motion.button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#F5E7C6]">
                  <th className="text-left p-4 text-[#555555] font-medium">
                    Event Name
                  </th>
                  <th className="text-left p-4 text-[#555555] font-medium">
                    Price
                  </th>
                  <th className="text-left p-4 text-[#555555] font-medium">
                    Seat Limit
                  </th>
                  <th className="text-left p-4 text-[#555555] font-medium">
                    Registrations
                  </th>
                  <th className="text-left p-4 text-[#555555] font-medium">
                    Check-ins
                  </th>
                  <th className="text-left p-4 text-[#555555] font-medium">
                    Status
                  </th>
                  <th className="text-left p-4 text-[#555555] font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-[#777]">
                      Loading events...
                    </td>
                  </tr>
                ) : events.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-[#777]">
                      No events yet. Create your first event!
                    </td>
                  </tr>
                ) : (
                  events.map((event, index) => {
                    const eventStatus =
                      event.endDate && new Date(event.endDate) < new Date()
                        ? 'Completed'
                        : event.startDate && new Date(event.startDate) > new Date()
                        ? 'Upcoming'
                        : 'Active';

                    return (
                      <motion.tr
                        key={event._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.05 }}
                        className="border-b border-[#F5E7C6]/70 hover:bg-[#FAF3E1]/70 transition-colors"
                      >
                        <td className="p-4 text-[#222222] font-medium">
                          {event.title}
                        </td>
                        <td className="p-4 text-[#555555]">
                          ${event.price}
                        </td>
                        <td className="p-4 text-[#555555]">
                          {event.capacity.toLocaleString()}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[#222222] font-medium">
                              {event.registrations || 0}
                            </span>
                            <span className="text-xs text-[#777777]">
                              (
                              {Math.round(
                                ((event.registrations || 0) / event.capacity) * 100,
                              )}
                              %)
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-[#555555]">
                          {event.registrations || 0}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              eventStatus === 'Active'
                                ? 'bg-[#FF6D1F1a] text-[#FF6D1F] border border-[#FF6D1F80]'
                                : eventStatus === 'Upcoming'
                                ? 'bg-blue-500/10 text-blue-600 border border-blue-500/50'
                                : 'bg-[#2222220f] text-[#222222] border border-[#2222224d]'
                            }`}
                          >
                            {eventStatus}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => window.open(`/event/${event._id}`, '_blank')}
                              className="p-2 rounded-lg bg-[#FF6D1F15] hover:bg-[#FF6D1F25] text-[#FF6D1F] transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteEvent(event._id)}
                              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-[#222222]">
                Create New Event
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-lg hover:bg-[#F5E7C6] transition-colors"
              >
                <X className="w-6 h-6 text-[#777]" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#222222] mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-[#F5E7C6] focus:border-[#FF6D1F] focus:ring-2 focus:ring-[#FF6D1F]/20 outline-none transition-all"
                  placeholder="e.g., Tech Summit 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#222222] mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-[#F5E7C6] focus:border-[#FF6D1F] focus:ring-2 focus:ring-[#FF6D1F]/20 outline-none transition-all resize-none"
                  placeholder="Event description, venue details, etc."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#222222] mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: parseFloat(e.target.value) })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#F5E7C6] focus:border-[#FF6D1F] focus:ring-2 focus:ring-[#FF6D1F]/20 outline-none transition-all"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#222222] mb-2">
                    Capacity *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({ ...formData, capacity: parseInt(e.target.value) })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#F5E7C6] focus:border-[#FF6D1F] focus:ring-2 focus:ring-[#FF6D1F]/20 outline-none transition-all"
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#222222] mb-2">
                    Start Date
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#F5E7C6] focus:border-[#FF6D1F] focus:ring-2 focus:ring-[#FF6D1F]/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#222222] mb-2">
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#F5E7C6] focus:border-[#FF6D1F] focus:ring-2 focus:ring-[#FF6D1F]/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl border border-[#F5E7C6] text-[#777] hover:bg-[#F5E7C6] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6D1F] to-[#FF9148] text-white font-bold hover:opacity-90 transition-opacity shadow-lg"
                >
                  Create Event
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
