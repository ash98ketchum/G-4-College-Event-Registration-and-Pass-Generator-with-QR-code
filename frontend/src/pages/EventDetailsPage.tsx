import React from "react";

interface EventItem {
  id: number;
  title: string;
  description: string;
  ticketType: string;
  seatLimit: number;
  qrUsage: string;
  analytics: string;
  image: string;
}

interface EventDetailsPageProps {
  event?: EventItem;
  eventId?: number;
}

const mockEvents: EventItem[] = [
  {
    id: 1,
    title: "Tech Hackathon",
    description:
      "A 24-hour coding marathon where students solve real-world problems using innovation, teamwork, and problem-solving skills.",
    ticketType: "Paid / Free (based on sponsorship)",
    seatLimit: 100,
    qrUsage: "Each participant receives a unique QR code for secure entry.",
    analytics: "Track check-ins per hour, progress, and challenge completion.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: 2,
    title: "Cultural Concert",
    description:
      "A cultural gala featuring bands, dancers, and performers with premium lighting and thrilling vibes.",
    ticketType: "Paid",
    seatLimit: 500,
    qrUsage: "QR scanning at entry. Duplicate passes are auto-flagged.",
    analytics:
      "Track footfall, VIP vs regular entries, and crowd flow patterns.",
    image:
      "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: 3,
    title: "Workshop on AI & Robotics",
    description:
      "Hands-on workshop on ML basics, robot movement, sensors, automation, and neural networks.",
    ticketType: "Paid",
    seatLimit: 60,
    qrUsage: "QR badge verifies workshop registration and content access.",
    analytics:
      "Track attendance, session completion, and engagement score.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=60",
  },
];

const EventDetailsPage: React.FC<EventDetailsPageProps> = ({
  event,
  eventId,
}) => {
  const selectedEvent =
    event || mockEvents.find((e) => e.id === eventId) || mockEvents[0];

  return (
    <div
      style={{
        backgroundColor: "#FAF3E1",
        minHeight: "100vh",
        padding: "40px 0",
        display: "flex",
        justifyContent: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          width: "60%",
          maxWidth: "750px",
          background: "#FFFFFF",
          borderRadius: "16px",
          padding: "24px",
          border: "2px solid #F5E7C6",
          boxShadow: "0 8px 20px rgba(0,0,0,0.10)",
        }}
      >
        {/* Banner */}
        <img
          src={selectedEvent.image}
          alt={selectedEvent.title}
          style={{
            width: "100%",
            height: "260px",
            borderRadius: "12px",
            objectFit: "cover",
            marginBottom: "18px",
          }}
        />

        <h1
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "#222222",
            marginBottom: "12px",
          }}
        >
          {selectedEvent.title}
        </h1>

        <p
          style={{
            fontSize: "15.5px",
            color: "#333333",
            lineHeight: "1.6",
            marginBottom: "18px",
          }}
        >
          {selectedEvent.description}
        </p>

        <div
          style={{
            background: "#F5E7C6",
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid #E2D2A8",
            marginBottom: "24px",
            fontSize: "15px",
            color: "#222",
          }}
        >
          <p>
            <strong>🎟 Ticket Type:</strong> {selectedEvent.ticketType}
          </p>
          <p>
            <strong>👥 Seat Limit:</strong> {selectedEvent.seatLimit}
          </p>
          <p>
            <strong>📌 QR Usage:</strong> {selectedEvent.qrUsage}
          </p>
          <p>
            <strong>📊 Analytics Focus:</strong> {selectedEvent.analytics}
          </p>
        </div>

        <button
          style={{
            background: "#FF6D1F",
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            color: "white",
            fontWeight: 700,
            fontSize: "18px",
            cursor: "pointer",
            transition: "0.2s",
          }}
          onClick={() => alert("Processing ticket purchase…")}
        >
          Buy Pass
        </button>
      </div>
    </div>
  );
};

export default EventDetailsPage;
