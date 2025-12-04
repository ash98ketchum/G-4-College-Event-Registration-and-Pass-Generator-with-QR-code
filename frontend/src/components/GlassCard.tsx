import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard = ({
  children,
  className = '',
  hover = true,
}: GlassCardProps) => {
  return (
    <motion.div
      className={`backdrop-blur-xl bg-white/80 rounded-2xl border border-[#F5E7C6] shadow-lg ${className}`}
      whileHover={
        hover
          ? {
              scale: 1.05,
              boxShadow: '0 0 30px rgba(255,109,31,0.4)',
            }
          : {}
      }
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
