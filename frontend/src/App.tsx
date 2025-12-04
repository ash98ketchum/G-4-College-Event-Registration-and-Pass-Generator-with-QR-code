import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import EventsPage from "./pages/EventsPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import DiscussionPage from "./pages/DiscussionPage";
import FaqsPage from "./pages/FaqsPage";
import ContactPage from "./pages/ContactPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import TicketPage from "./pages/TicketPage";
import QRScannerPage from "./pages/QRScannerPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />

        {/* User */}
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/tickets" element={<MyTicketsPage />} />
        <Route path="/discussion" element={<DiscussionPage />} />
        <Route path="/faqs" element={<FaqsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/event/:id" element={<EventDetailsPage />} />
        <Route path="/ticket/:id" element={<TicketPage />} />

        {/* Volunteer / Scanner */}
        <Route path="/scanner" element={<QRScannerPage />} />

        {/* Organizer / Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AdminDashboard />} />
        <Route path="/admin/volunteers" element={<AdminDashboard />} />
        <Route path="/admin/exports" element={<AdminDashboard />} />
        <Route path="/admin/settings" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
