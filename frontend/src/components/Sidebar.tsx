import { motion } from 'framer-motion';
import { LayoutDashboard, Calendar, Users, Download, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ activeTab = 'dashboard' }) {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { id: 'events', icon: Calendar, label: 'Events', path: '/admin/events' },
    { id: 'volunteers', icon: Users, label: 'Volunteers', path: '/admin/volunteers' },
    { id: 'exports', icon: Download, label: 'Exports', path: '/admin/exports' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-screen w-64 backdrop-blur-xl bg-[#FAF3E1]/70 border-r border-[#F5E7C6] p-6"
    >
      <div className="mb-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF6D1F] to-[#222222] bg-clip-text text-transparent">
          EventPass
        </h1>
        <p className="text-[#777777] text-sm mt-1">Admin Dashboard</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => navigate(item.path)}
            whileHover={{ scale: 1.04, x: 5 }}
            whileTap={{ scale: 0.96 }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-[#555555]
              ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-[#FF6D1F33] to-[#22222222] border border-[#FF6D1F55] text-[#222222] shadow-md"
                  : "hover:bg-[#F5E7C6]/40"
              }
            `}
          >
            <item.icon
              className={`w-5 h-5 ${
                activeTab === item.id ? "text-[#FF6D1F]" : "text-[#777777]"
              }`}
            />
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>
    </motion.aside>
  );
}
