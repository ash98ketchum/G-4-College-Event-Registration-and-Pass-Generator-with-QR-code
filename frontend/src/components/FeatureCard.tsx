import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{
        scale: 1.05,
        y: -10,
        boxShadow: '0 20px 60px rgba(255,109,31,0.45)',
      }}
      className="backdrop-blur-xl bg-white/80 rounded-2xl border border-[#F5E7C6] p-8 relative overflow-hidden group shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6D1F0f] via-[#F5E7C6] to-[#FF6D1F1f] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 bg-gradient-to-br from-[#FF6D1F] to-[#222222] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-[#FF6D1F80]"
        >
          <Icon className="w-8 h-8 text-[#FAF3E1]" />
        </motion.div>

        <h3 className="text-xl font-bold text-[#222222] mb-3">
          {title}
        </h3>
        <p className="text-[#555555] leading-relaxed">
          {description}
        </p>
      </div>

      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#FF6D1F1a] to-[#2222221a] rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
    </motion.div>
  );
};

export default FeatureCard;
