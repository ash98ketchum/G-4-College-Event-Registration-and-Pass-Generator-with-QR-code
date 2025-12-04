import { motion } from "framer-motion";
import {
  QrCode,
  CreditCard,
  Scan,
  BarChart3,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingOrbs from "../components/FloatingOrbs";
import FeatureCard from "../components/FeatureCard";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF3E1] via-[#F5E7C6] to-[#FF6D1F33] overflow-hidden text-[#222222]">
      <FloatingOrbs />

      <div className="relative z-10">
        {/* NAVBAR */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-6 py-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-gradient-to-br from-[#FF6D1F] to-[#222222] rounded-xl flex items-center justify-center"
            >
              <Sparkles className="w-6 h-6 text-[#FAF3E1]" />
            </motion.div>

            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF6D1F] via-[#FF9148] to-[#222222] bg-clip-text text-transparent">
              EventPass
            </h1>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admin")}
            className="px-6 py-3 rounded-xl backdrop-blur-xl bg-white/70 border border-[#F5E7C6] text-[#222222] font-medium hover:bg-white transition-all"
          >
            Sign In
          </motion.button>
        </motion.nav>

        {/* HERO */}
        <section className="container mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-100px)]">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 rounded-full backdrop-blur-xl bg-white/70 border border-[#F5E7C6] text-sm text-[#777777] mb-6"
              >
                Next-Gen Event Management
              </motion.span>

              <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Manage Events.{" "}
                <span className="bg-gradient-to-r from-[#FF6D1F] via-[#FF9148] to-[#222222] bg-clip-text text-transparent">
                  Scan Tickets.
                </span>{" "}
                Automate Everything.
              </h2>

              <p className="text-xl text-[#555555] mb-10 leading-relaxed">
                Smart pass system with secure QR entry and real-time analytics.
                Transform your event experience with cutting-edge technology.
              </p>

              <div className="flex flex-wrap gap-4">
                {/* USER → USER DASHBOARD */}
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(255,109,31,0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/user")}
                  className="group px-8 py-4 bg-gradient-to-r from-[#FF6D1F] via-[#FF9148] to-[#222222] 
                  rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-[#FF6D1F80] 
                  transition-all flex items-center gap-2"
                >
                  Register Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* ORGANIZER → ADMIN DASHBOARD */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/admin")}
                  className="px-8 py-4 backdrop-blur-xl bg-white/70 border border-[#F5E7C6] 
                  rounded-xl text-[#222222] font-bold text-lg hover:bg-white transition-all"
                >
                  Organizer Dashboard
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* RIGHT HERO CARD */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <div className="backdrop-blur-xl bg-white/80 rounded-3xl border border-[#F5E7C6] p-8 shadow-2xl">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-64 h-64 mx-auto bg-[#FAF3E1] rounded-2xl p-6 shadow-xl"
                >
                  <QrCode className="w-full h-full text-[#222222]" strokeWidth={1} />
                </motion.div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between backdrop-blur-xl bg-white/80 rounded-xl p-4 border border-[#F5E7C6]">
                    <span className="font-medium text-[#222222]">
                      Event: Tech Summit 2024
                    </span>
                    <span className="px-3 py-1 bg-[#FF6D1F1a] text-[#FF6D1F] rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between backdrop-blur-xl bg-white/80 rounded-xl p-4 border border-[#F5E7C6]">
                    <span className="text-[#777777]">Ticket ID: #TKT-12345</span>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -right-6 backdrop-blur-xl bg-gradient-to-br from-[#FF6D1F1a] to-[#2222221a] border border-[#FF6D1F66] rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-[#34D399] rounded-full animate-pulse" />
                  <span className="font-bold text-[#222222]">Check-in Success</span>
                </div>
                <p className="text-[#777777] text-sm">Verified at 14:32 PM</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-6 -left-6 backdrop-blur-xl bg-gradient-to-br from-[#FF6D1F1a] to-[#F5E7C6] border border-[#FF6D1F66] rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="w-5 h-5 text-[#FF6D1F]" />
                  <span className="font-bold text-[#222222]">Live Stats</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#777777]">Check-ins</span>
                    <span className="font-bold text-[#222222]">847/1000</span>
                  </div>
                  <div className="w-full h-2 bg-[#F5E7C6] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "84.7%" }}
                      transition={{ duration: 1.5, delay: 1 }}
                      className="h-full bg-gradient-to-r from-[#FF6D1F] to-[#222222]"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-br from-[#F5E7C6] to-[#FF6D1F33] blur-3xl -z-10" />
          </motion.div>
        </section>

        {/* FEATURES */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl lg:text-5xl font-bold mb-4">
              Powerful Features for{" "}
              <span className="bg-gradient-to-r from-[#FF6D1F] via-[#FF9148] to-[#222222] bg-clip-text text-transparent">
                Modern Events
              </span>
            </h3>
            <p className="text-xl text-[#555555] max-w-2xl mx-auto">
              Everything you need to create, manage, and scale your events seamlessly
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={QrCode}
              title="Instant QR Tickets"
              description="Generate secure QR code tickets instantly. Attendees receive digital passes with unique encrypted codes."
              delay={0}
            />
            <FeatureCard
              icon={CreditCard}
              title="Secure Payments"
              description="Integrated payment gateway with fraud protection. Accept all major cards and digital wallets."
              delay={0.1}
            />
            <FeatureCard
              icon={Scan}
              title="Fast Entry Scanner"
              description="Lightning-fast QR scanning at entry points. Verify tickets in under 1 second with offline mode support."
              delay={0.2}
            />
            <FeatureCard
              icon={BarChart3}
              title="Analytics Dashboard"
              description="Real-time insights and comprehensive reports. Track attendance, revenue, and engagement metrics."
              delay={0.3}
            />
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 py-20"
        >
          <div className="backdrop-blur-xl bg-gradient-to-r from-[#FAF3E1] via-[#F5E7C6] to-[#FF6D1F33] border border-[#F5E7C6] rounded-3xl p-12 text-center relative overflow-hidden shadow-xl">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-br from-[#FF6D1F33] to-[#22222222] blur-3xl"
            />
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-4 text-[#222222]">
                Ready to Transform Your Events?
              </h3>
              <p className="text-xl text-[#555555] mb-8 max-w-2xl mx-auto">
                Join thousands of organizers who trust EventPass for their event management needs
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255,109,31,0.8)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/admin")}
                className="px-10 py-5 bg-gradient-to-r from-[#FF6D1F] via-[#FF9148] to-[#222222] 
                rounded-xl text-white font-bold text-lg shadow-2xl hover:shadow-[#FF6D1F80] transition-all inline-flex items-center gap-2"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.section>

        <footer className="container mx-auto px-6 py-12 text-center">
          <p className="text-[#777777]">
            © 2024 EventPass. All rights reserved. Built with passion for seamless events.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
