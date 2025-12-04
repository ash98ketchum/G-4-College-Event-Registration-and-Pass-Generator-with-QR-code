# College Event Registration and Pass Generator with QR Code

A comprehensive event management system for college events with QR code-based digital passes.

## Features

- 🎓 **User Registration & Authentication**
  - Student registration with college details
  - JWT-based authentication
  - Role-based access (User/Admin)

- 📅 **Event Management**
  - Create and manage events (Admin)
  - Browse available events
  - Event capacity management
  - Registration deadline enforcement

- 🎫 **Ticket System**
  - Automated ticket generation
  - QR code passes
  - Email delivery of tickets
  - Ticket status tracking (Pending/Confirmed/Used/Cancelled)

- 📱 **QR Code Scanning**
  - Real-time QR code scanning
  - Ticket verification
  - Check-in management

## Project Structure

```
event-system/
├── backend/
│   ├── src/
│   │   ├── config/         # Database and environment configuration
│   │   ├── models/         # MongoDB schemas (User, Event, Ticket)
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions (QR, email, JWT)
│   │   ├── middleware/     # Auth and error handling
│   │   └── app.ts          # Express app setup
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/          # Page components
    │   ├── api/            # API integration
    │   └── App.tsx         # Main app component
    └── package.json
```

## Tech Stack

### Backend
- **Node.js** with **TypeScript**
- **Express.js** - Web framework
- **MongoDB** with **Mongoose** - Database
- **JWT** - Authentication
- **QRCode** - QR code generation
- **Nodemailer** - Email service
- **bcryptjs** - Password hashing

### Frontend
- **React** with **TypeScript**
- **React Router** - Navigation
- **Axios** - HTTP client
- **html5-qrcode** - QR code scanning

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/event-system
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_email_password
   FRONTEND_URL=http://localhost:3000
   ```

4. Build TypeScript:
   ```bash
   npm run build
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start development server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event (Admin)
- `PUT /api/events/:id` - Update event (Admin)
- `DELETE /api/events/:id` - Delete event (Admin)

### Tickets
- `POST /api/tickets/register` - Register for event
- `GET /api/tickets/my-tickets` - Get user's tickets
- `GET /api/tickets/:id` - Get ticket details
- `POST /api/tickets/verify` - Verify ticket (Admin)
- `POST /api/tickets/check-in` - Check-in ticket (Admin)
- `PUT /api/tickets/:id/cancel` - Cancel ticket

## User Roles

### User
- Register and login
- Browse events
- Register for events
- View their tickets
- Receive QR code passes via email

### Admin
- All user permissions
- Create, update, and delete events
- View all tickets
- Scan and verify QR codes
- Manage check-ins

## Features in Detail

### QR Code Generation
- Each ticket generates a unique QR code
- QR code contains ticket number, user ID, and event ID
- Encrypted data for security

### Email Notifications
- Automated email on successful registration
- Beautiful HTML email template
- Attached QR code pass
- Event details included

### Security
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Role-based authorization

## Development

### Backend Development
```bash
cd backend
npm run dev
```

### Frontend Development
```bash
cd frontend
npm start
```

### Build for Production

Backend:
```bash
cd backend
npm run build
npm start
```

Frontend:
```bash
cd frontend
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Support

For issues and questions, please create an issue in the repository.
4. College Event Registration & Pass
Generator Using QR CODE
1. Background
College fests and technical events often suffer from chaotic entry management. Organizers
rely on paper lists or Excel sheets, leading to long queues, proxy entries, and difficulty in
tracking actual footfall. Students frequently lose physical tickets, and verifying payments
manually is prone to errors.
2. Challenge
Build an end-to-end Event Management System that handles participant registration,
payment processing, and secure entry. The core feature is the generation of a unique,
tamper-proof QR Code for every attendee, which acts as their digital pass. Volunteers must
be able to scan this code to instantly verify and check in participants


3. Role:
Attendee (Student)  
● Registration: Fills out a registration form (Name, College, Event selection).  
● Payment: Completes payment (Mock or Real Gateway) for paid events.  
● Ticket Generation: Receives a digital ticket via Email/Dashboard containing a 
unique QR Code.  
● Entry: Shows the QR code at the venue gate for scanning.  
Event Organizer (Admin)  
● Event Setup: Creates events, sets ticket prices, and defines seat limits.  
● Analytics Dashboard: Views real-time stats: Total Registrations vs. Actual Check
ins.  
● Data Export: Downloads participant lists for certification.  
● Volunteer Management: Creates temporary accounts for gate volunteers.  
Volunteer (Gatekeeper)  
● Scanner Interface: Accesses a mobile-friendly scanner (Web or App). ● 
Verification: Scans the Attendee's QR code.  
● Action: System returns "Allowed" (Green) or "Duplicate/Invalid" (Red).  
● Check-in: Marks the attendee as "Present" to prevent re-entry with the same code.



event-system/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts
│   │   │   └── env.ts
│   │   │
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Event.ts
│   │   │   └── Ticket.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── event.controller.ts
│   │   │   └── ticket.controller.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── event.routes.ts
│   │   │   └── ticket.routes.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── qr.ts
│   │   │   ├── token.ts
│   │   │   ├── email.ts
│   │   │   └── responses.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   └── error.ts
│   │   │
│   │   └── app.ts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── EventCard.tsx
│   │   │   └── Scanner.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Register.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   └── Scan.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── events.ts
│   │   │   └── tickets.ts
│   │   │
│   │   └── App.tsx
│   └── package.json
│
└── README.md

