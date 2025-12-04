import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  suffix?: string;
  prefix?: string;
  delay?: number;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  suffix = '',
  prefix = '',
  delay = 0,
}: StatCardProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 40px rgba(255,109,31,0.5)',
      }}
      className="backdrop-blur-xl bg-white/80 rounded-2xl border border-[#F5E7C6] shadow-lg p-6 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6D1F0f] via-[#F5E7C6] to-[#FF6D1F1f] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-br from-[#FF6D1F] to-[#222222] rounded-xl shadow-lg">
            <Icon className="w-6 h-6 text-[#FAF3E1]" />
          </div>
        </div>

        <h3 className="text-[#777777] text-sm font-medium mb-2">
          {title}
        </h3>
        <p className="text-3xl font-bold text-[#222222]">
          {prefix}
          {count.toLocaleString()}
          {suffix}
        </p>
      </div>
    </motion.div>
  );
};

export default StatCard;
