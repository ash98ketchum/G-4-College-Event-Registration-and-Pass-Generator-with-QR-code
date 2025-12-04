# 🚀 Quick Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or connection URI)
- Git

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/ash98ketchum/G-4-College-Event-Registration-and-Pass-Generator-with-QR-code.git
cd G-4-College-Event-Registration-and-Pass-Generator-with-QR-code
```

### 2. Checkout the Branch
```bash
git checkout Abhay_2315000029
```

### 3. Backend Setup
```bash
cd backend
npm install

# Create .env file
# Copy .env.example to .env and configure:
# - MONGODB_URI
# - JWT_SECRET
# - PORT (default: 5000)
# - EMAIL settings (if using email notifications)

npm run dev
```

Backend will run on: `http://localhost:5000`

### 4. Frontend Setup
```bash
cd frontend
npm install

# Create .env file (already created)
# VITE_API_BASE_URL=http://localhost:5000/api

npm run dev
```

Frontend will run on: `http://localhost:5173`

## 🎯 Testing the Ticket System

### Test Flow:

1. **Register/Login**
   - Navigate to the landing page
   - Create an account or login

2. **Register for an Event**
   - Browse events at `/events`
   - Register for a hackathon/event
   - System automatically creates a ticket

3. **View Your Tickets**
   - Go to `/tickets` (My Tickets page)
   - You'll see all your registered events

4. **Download Hall Ticket**
   - Click "View & Download Ticket" on any ticket
   - You'll see the complete hall ticket with:
     - Event details
     - Your information
     - QR code
   - Click "Download PDF" to save

5. **Scan Tickets (Volunteer)**
   - Open `/scanner` in a new tab/device
   - Copy the QR token from a ticket
   - Paste it in the manual input field
   - Click "Validate Ticket"
   - You'll see entry allowed/denied

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── ticket.controller.ts    (Updated)
│   │   ├── routes/
│   │   │   └── ticket.routes.ts        (Updated)
│   │   ├── models/
│   │   │   ├── Ticket.ts
│   │   │   ├── Event.ts
│   │   │   └── User.ts
│   │   └── app.ts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── MyTicketsPage.tsx       (Updated)
│   │   │   ├── TicketPage.tsx          (Updated)
│   │   │   └── QRScannerPage.tsx       (New)
│   │   ├── services/
│   │   │   └── api.ts                  (New)
│   │   └── App.tsx                     (Updated)
│   ├── package.json
│   └── .env
│
├── TICKET_SYSTEM_README.md             (New)
└── SETUP_GUIDE.md                      (This file)
```

## 🔍 Key Files Modified/Added

### Backend:
- `controllers/ticket.controller.ts` - Added getUserTickets, getTicketById
- `routes/ticket.routes.ts` - Added new routes

### Frontend:
- `pages/MyTicketsPage.tsx` - Complete ticket list with UI
- `pages/TicketPage.tsx` - Hall ticket with QR & PDF download
- `pages/QRScannerPage.tsx` - Scanner interface for volunteers
- `services/api.ts` - Centralized API service
- `App.tsx` - Added /scanner route

## 🎨 Color Scheme

All components use the consistent color palette:
- Primary BG: `#FAF3E1`
- Secondary BG: `#F5E7C6`
- Accent: `#FF6D1F`
- Text: `#222222`

## 🔧 Troubleshooting

### Backend won't start
- Ensure MongoDB is running
- Check .env configuration
- Verify PORT is not in use

### Frontend can't connect to backend
- Check VITE_API_BASE_URL in frontend/.env
- Ensure backend is running
- Check CORS settings in backend

### QR code not generating
- Check that qrcode package is installed
- Verify ticket has qrData field
- Check browser console for errors

### PDF download not working
- Ensure html2canvas and jspdf are installed
- Test in modern browsers (Chrome, Firefox, Edge)
- Check browser console for errors

## 📱 Responsive Design

All pages are responsive and work on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔐 Security Notes

- Scanner endpoint should be protected with volunteer authentication in production
- QR tokens are signed and verified server-side
- Each ticket can only be scanned once
- All sensitive data is transmitted over HTTPS in production

## 📞 Support

For issues:
1. Check the console logs (browser and terminal)
2. Verify all dependencies are installed
3. Ensure backend and frontend are both running
4. Check the TICKET_SYSTEM_README.md for detailed documentation

## ✅ Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] MongoDB connected
- [ ] Can register for events
- [ ] Tickets appear in /tickets
- [ ] Can view individual ticket at /ticket/:id
- [ ] QR code displays correctly
- [ ] PDF downloads successfully
- [ ] Scanner validates tickets at /scanner
- [ ] Duplicate scans are detected

---

**Happy Coding! 🎉**

Branch: Abhay_2315000029
