import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db";
import ticketRoutes from "./routes/ticket.routes";

dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Testing root route
app.get("/", (req, res) => {
  res.send("🎉 Event Registration & QR Ticket System API Running!");
});

// Routes
app.use("/api/tickets", ticketRoutes);

// Global Error Handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error("❌ Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

export default app;
