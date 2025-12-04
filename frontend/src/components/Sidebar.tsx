import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Download,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const Sidebar = ({
  activeTab = 'dashboard',
  onTabChange,
}: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'volunteers', icon: Users, label: 'Volunteers' },
    { id: 'exports', icon: Download, label: 'Exports' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-screen w-64 backdrop-blur-xl bg-white/80 border-r border-[#F5E7C6] p-6 z-30"
    >
      <div className="mb-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF6D1F] via-[#FF9148] to-[#222222] bg-clip-text text-transparent">
          EventPass
        </h1>
        <p className="text-[#777777] text-sm mt-1">Admin Dashboard</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onTabChange?.(item.id)}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id
                ? 'bg-gradient-to-r from-[#FF6D1F1a] to-[#FF91481a] border border-[#FF6D1F80] text-[#222222] shadow-md'
                : 'text-[#777777] hover:text-[#222222] hover:bg-[#FAF3E1]'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      <motion.div
        className="absolute bottom-6 left-6 right-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="backdrop-blur-xl bg-gradient-to-br from-[#FAF3E1] to-[#FF6D1F22] rounded-xl p-4 border border-[#F5E7C6] shadow-sm">
          <p className="text-sm text-[#555555] mb-1">Need help?</p>
          <p className="text-xs text-[#777777]">
            Check our documentation
          </p>
        </div>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;
