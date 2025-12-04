# Ticket System Implementation - README

## 🎟️ New Features Added

This implementation adds a complete ticket generation and validation system with QR codes for the College Event Registration platform.

## ✨ Features Implemented

### 1. **My Tickets Page** (`/tickets`)
- Displays all registered event tickets for the logged-in user
- Shows ticket details including:
  - Event name and description
  - Registration number (Ticket ID)
  - Attendee information
  - Issue date and event date
  - Ticket status (Valid / Checked In)
- Quick access to view and download individual tickets

### 2. **Hall Ticket Page** (`/ticket/:id`)
- Complete hall ticket with professional design
- Includes:
  - **Header**: Project branding and title
  - **Event Details**: Hackathon name, description, date, registration number
  - **User Details**: Name, email, college, phone number
  - **QR Code**: Auto-generated unique QR code for entry verification
  - **Instructions**: 7-point guidance for attendees
  - **Footer**: Issue timestamp
- **PDF Download**: One-click download of hall ticket as PDF
- Auto-generates QR code with URL format: `ProjectName + EventName + RegistrationNumber`

### 3. **QR Scanner Page** (`/scanner`)
- Volunteer/gatekeeper interface for entry verification
- Features:
  - QR code image upload (for future implementation)
  - Manual token validation
  - Real-time validation feedback
  - Entry allowed/denied visual indicators
  - Duplicate scan detection
  - Auto-print functionality on successful scan

### 4. **Backend API Enhancements**
- `GET /api/tickets/user/:userId` - Fetch all tickets for a user
- `GET /api/tickets/:ticketId` - Fetch single ticket details
- `POST /api/tickets/validate` - Validate scanned QR codes
- `POST /api/tickets/create` - Create new ticket (existing)

## 🎨 Color Palette Used

All components follow the specified color scheme:
- **Primary Background**: `#FAF3E1`
- **Secondary Background**: `#F5E7C6`
- **Accent/Primary**: `#FF6D1F`
- **Text/Dark**: `#222222`

## 📦 Packages Installed

### Frontend
- `qrcode` (^1.5.4) - QR code generation
- `@types/qrcode` (^1.5.6) - TypeScript types for qrcode
- `jspdf` (^3.0.4) - PDF generation
- `html2canvas` (^1.4.1) - HTML to canvas conversion for PDF

### Backend
No new packages required (qrcode already installed)

## 🚀 How to Run

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📋 User Flow

### For Attendees:
1. Register for an event → Ticket created automatically
2. Navigate to **My Tickets** (`/tickets`)
3. Click **"View & Download Ticket"**
4. Download PDF or save hall ticket
5. Show QR code at venue gate

### For Volunteers (Gatekeepers):
1. Navigate to **Scanner** (`/scanner`)
2. Ask attendee to show QR code
3. Upload QR image or paste token manually
4. Click **"Validate Ticket"**
5. System shows:
   - ✅ **Green**: Entry allowed (first-time scan)
   - ❌ **Red**: Entry denied (duplicate/invalid)
6. Click **"Scan Next Ticket"** to continue

## 🔐 Security Features

- **One-time scan**: Each ticket can only be scanned once
- **Signed tokens**: QR codes contain cryptographically signed tokens
- **Timestamp tracking**: Records when tickets are scanned
- **Duplicate detection**: Prevents re-entry attempts

## 📱 Routes Added

| Route | Component | Description |
|-------|-----------|-------------|
| `/tickets` | MyTicketsPage | View all user tickets |
| `/ticket/:id` | TicketPage | View single ticket with QR and download PDF |
| `/scanner` | QRScannerPage | Scan and validate tickets (volunteers) |

## 🔧 Configuration

Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 📄 API Service

All API calls are centralized in `frontend/src/services/api.ts`:
- `authAPI` - Authentication endpoints
- `eventAPI` - Event management
- `ticketAPI` - Ticket operations

## 🎯 Key Implementation Details

### QR Code Generation
- Encodes the signed token from backend
- Size: 300x300 pixels
- Colors match the project palette
- Generated using `qrcode` library

### PDF Generation
- Uses `html2canvas` to capture the ticket component
- Converts to PNG image
- Embeds in PDF using `jspdf`
- A4 portrait format
- Filename: `Hall-Ticket-{TicketID}.pdf`

### Scanner Validation
- Accepts both image upload and manual token input
- Validates against backend `/api/tickets/validate`
- Shows real-time success/error states
- Includes scan history (timestamp, user info)

## 🐛 Known Limitations

- QR image scanning requires additional QR decoder library (jsQR recommended)
- Currently uses manual token input as primary method
- Scanner page accessible without authentication (can be protected in production)

## 🚀 Future Enhancements

1. Add camera-based QR scanning using device camera
2. Implement real-time QR image decoding
3. Add ticket analytics dashboard for organizers
4. Email integration for automatic ticket delivery
5. Bulk ticket download for multiple events
6. Ticket transfer functionality

## 📝 Notes

- All timestamps are displayed in user's local timezone
- PDF generation works best in modern browsers
- Scanner page is mobile-friendly for volunteers using phones/tablets
- Tickets are linked to events and users via MongoDB references

## 👤 Author

**Branch**: Abhay_2315000029
**Date**: December 4, 2025

---

## 📞 Support

For issues or questions, contact the development team through the repository issues page.
