import React from "react";

const events = [
  {
    id: 1,
    title: "Tech Hackathon",
    description:
      "A 24-hour coding marathon where students solve real-world problems using innovative software and hardware solutions. Participants showcase creativity, teamwork, algorithms, UI/UX design, and problem-solving skills. Winners receive certificates, cash prizes, and internship opportunities.",
    ticketType: "Paid / Free (based on sponsorship)",
    seatLimit: 100,
    qrUsage:
      "Each participant receives a unique QR code for secure entry into the hackathon venue.",
    analytics:
      "Track participant count, team progress, check-ins per hour, and challenge completion rate.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=60",
  },

  {
    id: 2,
    title: "Cultural Concert",
    description:
      "An energetic cultural gala featuring college bands, solo artists, dance performances, and dramatic showcases. Enjoy a night full of music, lights, and entertainment with premium audio-visual effects.",
    ticketType: "Paid",
    seatLimit: 500,
    qrUsage:
      "Attendees scan their QR tickets at entry gates. Duplicate and fake passes are automatically flagged.",
    analytics:
      "Track total footfall, VIP vs Regular entries, crowd flow, and entry timing patterns.",
    image:
      "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=900&q=60",
  },

  {
    id: 3,
    title: "Workshop on AI & Robotics",
    description:
      "A hands-on training workshop covering machine learning basics, robot movement programming, sensors, Arduino, neural networks, and automation logic. Perfect for beginners and tech enthusiasts!",
    ticketType: "Paid",
    seatLimit: 60,
    qrUsage:
      "Participants receive QR badges to verify workshop registration and material access.",
    analytics:
      "Track attendance, workshop sessions completed, and participant engagement level.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=60",
  },
];

const EventDetailsPage = ({ id = 1 }) => {
  const event = events.find((e) => e.id === id);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img src={event.image} alt={event.title} style={styles.image} />

        <h1 style={styles.title}>{event.title}</h1>

        <p style={styles.description}>{event.description}</p>

        <div style={styles.infoBox}>
          <p><strong>🎟 Ticket Type:</strong> {event.ticketType}</p>
          <p><strong>👥 Seat Limit:</strong> {event.seatLimit} attendees</p>
          <p><strong>📌 QR Usage:</strong> {event.qrUsage}</p>
          <p><strong>📊 Analytics Focus:</strong> {event.analytics}</p>
        </div>

        <button style={styles.button}>Buy Pass</button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: "#FAF3E1",
    minHeight: "100vh",
    padding: "30px 0",
    display: "flex",
    justifyContent: "center",
    fontFamily: "Poppins, sans-serif",
  },

  card: {
    width: "60%",             // reduced from 80%
    maxWidth: "650px",        // reduced from 900px
    background: "#FFFFFF",
    borderRadius: "14px",     // reduced from 16px
    padding: "18px",          // reduced from 24px
    border: "2px solid #F5E7C6",
    boxShadow: "0 6px 15px rgba(0,0,0,0.10)",
  },

  image: {
    width: "100%",
    height: "200px",          // reduced from 280px
    borderRadius: "10px",
    objectFit: "cover",
    marginBottom: "15px",
  },

  title: {
    fontSize: "26px",         // reduced from 32px
    fontWeight: "700",
    color: "#222222",
    marginBottom: "8px",
  },

  description: {
    fontSize: "14.5px",       // slightly smaller
    color: "#333",
    lineHeight: "1.5",
    marginBottom: "15px",
  },

  infoBox: {
    background: "#F5E7C6",
    padding: "12px",          // smaller padding
    borderRadius: "10px",
    marginBottom: "18px",
    border: "1px solid #E2D2A8",
    fontSize: "14px",
  },

  button: {
    background: "#FF6D1F",
    width: "100%",
    padding: "10px",          // reduced from 14px
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "700",
    color: "white",
    cursor: "pointer",
  },
};

export default EventDetailsPage;
