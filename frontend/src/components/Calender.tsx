import { useState } from "react";
import { motion } from "framer-motion";

export interface CalendarEvent {
  date: string; // YYYY-MM-DD
  title: string;
}

interface CalenderProps {
  events: CalendarEvent[];
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calender = ({ events }: CalenderProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const eventDates = events
    .filter((e) => e.date.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`))
    .map((e) => Number(e.date.split("-")[2]));

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

  const stackedVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  const monthLabel = `${monthNames[month]} ${year}`;

  return (
    <div className="w-full max-w-md relative">
      {/* Background stack */}
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%] h-full rounded-3xl 
        backdrop-blur-xl bg-[#FAF3E1]/40 border border-[#F5E7C6] shadow-xl"
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 0.95, y: 10 }}
        transition={{ duration: 0.6 }}
      />
      <motion.div
        className="absolute top-2 left-1/2 -translate-x-1/2 w-[95%] h-full rounded-3xl 
        backdrop-blur-xl bg-[#F5E7C6]/50 border border-[#FF6D1F33] shadow-xl"
        initial={{ scale: 0.97, y: 10 }}
        animate={{ scale: 0.98, y: 5 }}
        transition={{ duration: 0.6 }}
      />

      {/* Front card */}
      <motion.div
        variants={stackedVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        className="relative z-10 backdrop-blur-xl rounded-3xl bg-[#FFFFFF]/80 border border-[#F5E7C6] 
        shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="px-3 py-1 rounded-lg bg-[#F5E7C6] text-[#222222] hover:bg-[#FAF3E1] transition"
          >
            ‹
          </button>
          <h2 className="text-lg font-bold text-[#222222]">{monthLabel}</h2>
          <button
            onClick={nextMonth}
            className="px-3 py-1 rounded-lg bg-[#F5E7C6] text-[#222222] hover:bg-[#FAF3E1] transition"
          >
            ›
          </button>
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 text-center text-[#777] font-medium mb-2 text-xs">
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 gap-2 text-sm">
          {[...Array(firstDay).keys()].map((i) => (
            <div key={"empty-" + i}></div>
          ))}

          {[...Array(daysInMonth).keys()].map((i) => {
            const day = i + 1;
            const isEventDay = eventDates.includes(day);

            return (
              <motion.div
                key={day}
                whileHover={{ scale: 1.15, y: -2 }}
                className={`h-10 flex items-center justify-center rounded-xl cursor-pointer shadow-md ${
                  isEventDay
                    ? "bg-[#FF6D1F22] border border-[#FF6D1F] text-[#FF6D1F]"
                    : "bg-[#F5E7C6] text-[#222222]"
                }`}
              >
                <span className="relative">
                  {day}
                  {isEventDay && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FF6D1F] rounded-full" />
                  )}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Calender;
