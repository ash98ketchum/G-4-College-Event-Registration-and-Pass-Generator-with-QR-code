import { motion } from 'framer-motion';
import { Bell, Search, User } from 'lucide-react';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-64 right-0 h-20 backdrop-blur-xl bg-white/80 border-b border-[#F5E7C6] px-8 flex items-center justify-between z-40"
    >
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
          <input
            type="text"
            placeholder="Search events, attendees..."
            className="w-full bg-white/80 border border-[#F5E7C6] rounded-xl pl-12 pr-4 py-3 text-[#222222] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#FF6D1F80] focus:border-[#FF6D1F80] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative p-3 rounded-xl bg-white/80 hover:bg-white shadow-sm transition-colors"
        >
          <Bell className="w-5 h-5 text-[#777777]" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF6D1F] rounded-full animate-pulse" />
        </motion.button>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/80 hover:bg-white transition-colors cursor-pointer border border-[#F5E7C6]"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6D1F] to-[#222222] flex items-center justify-center">
            <User className="w-4 h-4 text-[#FAF3E1]" />
          </div>
          <div className="text-sm">
            <p className="text-[#222222] font-medium">Admin User</p>
            <p className="text-[#777777] text-xs">
              admin@eventpass.com
            </p>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
