import { motion } from "framer-motion";
import { LayoutDashboard, Calendar, Users, Download, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  activeTab?: string;
}

const Sidebar = ({ activeTab = "dashboard" }: SidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { id: "events", icon: Calendar, label: "Events", path: "/admin/events" },
    { id: "volunteers", icon: Users, label: "Volunteers", path: "/admin/volunteers" },
    { id: "exports", icon: Download, label: "Exports", path: "/admin/exports" },
    { id: "settings", icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-screen w-64 backdrop-blur-xl bg-white/5 border-r border-white/10 p-6 z-40"
    >
      <div className="mb-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          EventPass
        </h1>
        <p className="text-gray-400 text-sm mt-1">Admin Dashboard</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => navigate(item.path)}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id
                ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-purple-500/30 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
