import { motion } from 'framer-motion';

const FloatingOrbs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-[#FAF3E1] to-[#FF6D1F55] rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-40 right-32 w-80 h-80 bg-gradient-to-br from-[#F5E7C6] to-[#22222255] rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-32 left-1/3 w-72 h-72 bg-gradient-to-br from-[#FF6D1F55] to-[#22222233] rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-br from-[#F5E7C6] to-[#FF6D1F55] rounded-full blur-3xl"
      />
    </div>
  );
};

export default FloatingOrbs;
