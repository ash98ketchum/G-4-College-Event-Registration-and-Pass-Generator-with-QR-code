# G-4-College-Event-Registration-and-Pass-Generator-with-QR-code
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


Flow of Project
          ┌──────────┐
          │  Sign Up  │
          └─────┬────┘
                │
                ▼
          ┌──────────┐
          │   Login   │
          └─────┬────┘
                │
                ▼
      ┌───────────────────────────────┐
      │           Home Page           │
      │  (User registers from here)   │
      └───────────┬───────────────────┘
                  │
                  ▼
      ┌───────────────────────────────┐
      │   List of Many Events         │
      │  (User clicks any event)      │
      └───────────┬───────────────────┘
                  │
                  ▼
      ┌───────────────────────────────┐
      │     Event Details Page        │
      │ Info + Rules + Date + Price   │
      │       BUY PASS Button         │
      └───────────┬───────────────────┘
                  │
                  ▼
      ┌───────────────────────────────┐
      │     Payment QR is shown       │
      │   (User scans QR and pays)    │
      └───────────┬───────────────────┘
                  │
                  ▼
      ┌───────────────────────────────┐
      │   Payment Successful          │
      │ Final Entry Pass is created   │
      │     (QR Code generated)       │
      └───────────┬───────────────────┘
                  │
                  ▼
      ┌───────────────────────────────┐
      │ Back to Home → "My Passes"    │
      │   User sees their QR Ticket   │
      └───────────┬───────────────────┘
                  │
                  ▼
      ┌───────────────────────────────┐
      │ View Pass (Final QR Code)     │
      │    + Download Pass Button     │
      └───────────┬───────────────────┘
                  │
                  ▼
      ┌───────────────────────────────┐
      │   User Downloads the Pass     │
      └───────────────────────────────┘

