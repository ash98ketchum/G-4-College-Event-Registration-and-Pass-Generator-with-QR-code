import { motion } from 'framer-motion';
import {
  Users,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import FloatingOrbs from '../components/FloatingOrbs';

const AdminDashboard = () => {
  const events = [
    {
      id: 1,
      name: 'Tech Summit 2024',
      price: 299,
      limit: 1000,
      registrations: 847,
      checkins: 723,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Music Festival',
      price: 149,
      limit: 5000,
      registrations: 4521,
      checkins: 3892,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Business Workshop',
      price: 199,
      limit: 200,
      registrations: 186,
      checkins: 142,
      status: 'Active',
    },
    {
      id: 4,
      name: 'Art Exhibition',
      price: 49,
      limit: 300,
      registrations: 267,
      checkins: 198,
      status: 'Active',
    },
    {
      id: 5,
      name: 'Food & Wine Expo',
      price: 89,
      limit: 800,
      registrations: 654,
      checkins: 487,
      status: 'Upcoming',
    },
  ];

  const totalRegistrations = events.reduce(
    (sum, event) => sum + event.registrations,
    0,
  );
  const totalCheckins = events.reduce(
    (sum, event) => sum + event.checkins,
    0,
  );
  const totalRevenue = events.reduce(
    (sum, event) => sum + event.registrations * event.price,
    0,
  );
  const totalCapacity = events.reduce((sum, event) => sum + event.limit, 0);
  const capacityUsed = Math.round(
    (totalRegistrations / totalCapacity) * 100,
  );

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
                {events.map((event, index) => (
                  <motion.tr
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="border-b border-[#F5E7C6]/70 hover:bg-[#FAF3E1]/70 transition-colors"
                  >
                    <td className="p-4 text-[#222222] font-medium">
                      {event.name}
                    </td>
                    <td className="p-4 text-[#555555]">
                      ${event.price}
                    </td>
                    <td className="p-4 text-[#555555]">
                      {event.limit.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[#222222] font-medium">
                          {event.registrations}
                        </span>
                        <span className="text-xs text-[#777777]">
                          (
                          {Math.round(
                            (event.registrations / event.limit) * 100,
                          )}
                          %)
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-[#555555]">
                      {event.checkins}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.status === 'Active'
                            ? 'bg-[#FF6D1F1a] text-[#FF6D1F] border border-[#FF6D1F80]'
                            : 'bg-[#2222220f] text-[#222222] border border-[#2222224d]'
                        }`}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg bg-[#FF6D1F15] hover:bg-[#FF6D1F25] text-[#FF6D1F] transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg bg-[#22222210] hover:bg-[#22222220] text-[#222222] transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
