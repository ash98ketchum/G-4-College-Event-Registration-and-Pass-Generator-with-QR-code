import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Home,
  CalendarDays,
  Ticket,
  MessageCircle,
  HelpCircle,
  Phone,
  LogOut,
  MapPin,
  Star,
  Bell,
  Search,
  User as UserIcon,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PremiumCalendar, { CalendarEvent } from "../components/Calender";
import { eventAPI, ticketAPI } from "../services/api";

interface Event {
  _id: string;
  title: string;
  description?: string;
  price: number;
  capacity: number;
  registrations: number;
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

interface UserTicket {
  _id: string;
  eventId: string;
  userId: string;
  tid: string;
  qrData: string;
  scanned: boolean;
  issuedAt: string;
}

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const userName = user?.name || "User";

  const [events, setEvents] = useState<Event[]>([]);
  const [userTickets, setUserTickets] = useState<UserTicket[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch events and user tickets
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [eventsResponse, ticketsResponse] = await Promise.all([
          eventAPI.getAllEvents(),
          user?.id ? ticketAPI.getUserTickets(user.id) : Promise.resolve({ data: [] }),
        ]);
        
        if (eventsResponse.data) {
          setEvents(eventsResponse.data);
        }
        if (ticketsResponse.data) {
          setUserTickets(ticketsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Calculate stats from real data
  const stats = {
    ticketsPurchased: userTickets.length,
    upcomingEvents: events.filter(e => !e.endDate || new Date(e.endDate) > new Date()).length,
    citiesVisited: new Set(userTickets.map(t => 'Event')).size,
  };

  // Get recommended events (events not yet purchased)
  const recommendedEvents = events
    .filter(e => !userTickets.some(t => t.eventId === e._id))
    .slice(0, 4);

  // Generate calendar events from all events
  const eventDates: CalendarEvent[] = events
    .filter(e => e.startDate)
    .map(e => ({
      date: e.startDate!.split('T')[0],
      title: e.title,
    }));

  const progress = 50; // happiness %
  const stars = userTickets.length; // star loops based on tickets

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#FAF3E1] to-[#F5E7C6] text-[#222222]">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 h-20 backdrop-blur-xl bg-white/40 border-b border-[#F5E7C6] px-8 flex items-center justify-between z-50 shadow-md">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF6D1F] to-[#222222] bg-clip-text text-transparent">
          EventPass
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[#777]" />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 rounded-xl bg-white/60 border border-[#F5E7C6] focus:ring-[#FF6D1F] outline-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="p-3 rounded-xl bg-white/60 border border-[#F5E7C6]"
          >
            <Bell className="w-5 h-5 text-[#FF6D1F]" />
          </motion.button>

          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/60 border border-[#F5E7C6]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6D1F] to-[#222] flex items-center justify-center text-white">
              <UserIcon size={16} />
            </div>
            <div>
              <p className="font-medium">{userName}</p>
              <p className="text-xs text-[#777]">user@eventpass.com</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 pt-20">
        {/* SIDEBAR */}
        <aside className="w-64 p-6 bg-[#FAF3E1]/60 border-r border-[#F5E7C6] shadow-xl fixed h-full left-0 top-20">
          <h1 className="text-lg mb-6 text-[#777]">Your personal event hub</h1>

          <nav className="space-y-3">
            <button
              onClick={() => navigate("/user")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/70 hover:bg-[#FF6D1F22] transition shadow"
            >
              <Home className="w-5 h-5 text-[#FF6D1F]" />
              Home
            </button>
            <button
              onClick={() => navigate("/events")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/70 hover:bg-[#FF6D1F22] transition shadow"
            >
              <CalendarDays className="w-5 h-5 text-[#FF6D1F]" />
              Events
            </button>
            <button
              onClick={() => navigate("/tickets")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/70 hover:bg-[#FF6D1F22] transition shadow"
            >
              <Ticket className="w-5 h-5 text-[#FF6D1F]" />
              My Tickets
            </button>
            <button
              onClick={() => navigate("/discussion")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/70 hover:bg-[#FF6D1F22] transition shadow"
            >
              <MessageCircle className="w-5 h-5 text-[#FF6D1F]" />
              Discussion
            </button>
            <button
              onClick={() => navigate("/faqs")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/70 hover:bg-[#FF6D1F22] transition shadow"
            >
              <HelpCircle className="w-5 h-5 text-[#FF6D1F]" />
              FAQs
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/70 hover:bg-[#FF6D1F22] transition shadow"
            >
              <Phone className="w-5 h-5 text-[#FF6D1F]" />
              Contact Us
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-100 text-red-600 shadow mt-6 w-full"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-10 ml-64">
          <h1 className="text-4xl font-bold mb-1">
            Welcome back, <span className="text-[#FF6D1F]">{userName}</span> 👋
          </h1>
          <p className="text-[#777] mb-8">Here’s a quick snapshot of your event journey.</p>

          {/* Stats + Happiness */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
            <StatCard title="Tickets Purchased" value={stats.ticketsPurchased} icon={Ticket} />
            <StatCard title="Upcoming Events" value={stats.upcomingEvents} icon={CalendarDays} />
            <StatCard title="Cities Visited" value={stats.citiesVisited} icon={MapPin} />

            {/* Happiness meter */}
            <div className="flex flex-col items-center bg-white/80 rounded-3xl p-6 shadow-xl">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="54" stroke="#F5E7C6" strokeWidth="12" fill="none" />
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    stroke="#FF6D1F"
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 54}
                    strokeDashoffset={((100 - progress) / 100) * 2 * Math.PI * 54}
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                  {progress}%
                </div>
              </div>
              <p className="mt-3 text-sm text-[#777]">
                Happiness meter • Stars:{" "}
                <span className="text-[#FF6D1F] font-bold">{stars}</span>
              </p>
            </div>
          </div>

          {/* Content + Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-10">
              <h2 className="text-3xl font-bold">Recommended For You</h2>
              {loading ? (
                <div className="text-center py-8 text-[#777]">Loading events...</div>
              ) : recommendedEvents.length === 0 ? (
                <div className="text-center py-8 text-[#777]">
                  No events available. Check back later!
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {recommendedEvents.map((e) => (
                    <EventCard key={e._id} event={e} navigate={navigate} userTickets={userTickets} />
                  ))}
                </div>
              )}

              <h2 className="text-3xl font-bold mt-10">Upcoming Events</h2>
              {loading ? (
                <div className="text-center py-8 text-[#777]">Loading...</div>
              ) : eventDates.length === 0 ? (
                <div className="text-center py-8 text-[#777]">
                  No upcoming events scheduled.
                </div>
              ) : (
                <div className="space-y-4">
                  {eventDates.slice(0, 5).map((ed, i) => {
                    const event = events.find(e => e.title === ed.title);
                    return (
                      <div
                        key={i}
                        className="p-5 bg-white/80 shadow rounded-2xl flex items-center justify-between"
                      >
                        <div>
                          <p className="font-bold text-lg">{ed.title}</p>
                          <p className="text-[#777]">{ed.date}</p>
                        </div>
                        <ArrowRight
                          className="w-6 h-6 text-[#FF6D1F] cursor-pointer"
                          onClick={() => event && navigate(`/event/${event._id}`)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* RIGHT SIDE: Calendar */}
            <div className="pt-6">
              <PremiumCalendar events={eventDates} />
            </div>
          </div>
        </main>
      </div>

      <footer className="text-center py-6 mt-6 bg-white/40 backdrop-blur-xl border-t border-[#F5E7C6] text-[#777]">
        © 2025 EventPass • Designed for a seamless event experience ✨
      </footer>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const StatCard = ({ title, value, icon: Icon }: StatCardProps) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="p-6 rounded-3xl bg-white/80 shadow-xl flex items-center gap-4"
  >
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6D1F] to-[#222] flex items-center justify-center text-white shadow-lg">
      <Icon className="w-7 h-7" />
    </div>
    <div>
      <p className="text-sm text-[#777]">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </motion.div>
);

interface EventCardProps {
  event: Event;
  navigate: ReturnType<typeof useNavigate>;
  userTickets: UserTicket[];
}

const EventCard = ({ event, navigate, userTickets }: EventCardProps) => {
  const hasPurchased = userTickets.some(t => t.eventId === event._id);
  const availableSeats = event.capacity - (event.registrations || 0);
  const formattedDate = event.startDate 
    ? new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'TBA';

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-white/80 rounded-3xl shadow-xl">
      <h3 className="text-xl font-bold">{event.title}</h3>
      <p className="mt-2 text-[#777] line-clamp-2">{event.description || 'No description'}</p>
      <p className="mt-2 text-[#777]">📅 {formattedDate}</p>
      <p className="text-[#777]">🎫 {availableSeats} seats available</p>
      <p className="text-[#FF6D1F] mt-1 flex items-center gap-1">
        <Star className="w-4 h-4 fill-current" /> 4.5
      </p>
      <p className="text-xl font-semibold mt-2">
        {event.price === 0 ? 'Free' : `$${event.price}`}
      </p>

      <button
        onClick={() =>
          hasPurchased 
            ? navigate('/tickets')
            : navigate(`/event/${event._id}`)
        }
        className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6D1F] to-[#222] text-white font-bold shadow hover:opacity-90"
      >
        {hasPurchased ? "View Ticket" : "Buy Ticket"}
      </button>
    </motion.div>
  );
};

export default UserDashboard;
