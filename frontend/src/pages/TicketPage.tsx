import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ticketAPI } from '../services/api';

interface TicketData {
  _id: string;
  tid: string;
  eventId: {
    _id: string;
    title: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    price?: number;
  };
  userId: {
    _id: string;
    name: string;
    email: string;
    college?: string;
    phone?: string;
  };
  qrData: string;
  scanned: boolean;
  issuedAt: string;
  scannedAt?: string;
}

const TicketPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ticketRef = useRef<HTMLDivElement>(null);
  
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    loadTicket();
  }, [id]);

  const loadTicket = async () => {
    try {
      if (!id) {
        setError('Invalid ticket ID');
        setLoading(false);
        return;
      }

      const result = await ticketAPI.getTicketById(id);
      
      if (result.ticket) {
        setTicket(result.ticket);
        await generateQRCode(result.ticket);
      } else {
        setError('Ticket not found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load ticket');
    } finally {
      setLoading(false);
    }
  };

  const generateQRCode = async (ticketData: TicketData) => {
    try {
      // Generate QR code URL: ProjectName + EventName + RegistrationNumber
      const qrUrl = `https://college-event-registration/${ticketData.eventId.title.replace(/\s+/g, '-')}/${ticketData.tid}`;
      
      // Generate QR code image
      const qrImage = await QRCode.toDataURL(ticketData.qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: '#222222',
          light: '#FAF3E1',
        },
      });
      
      setQrCodeUrl(qrImage);
    } catch (err) {
      console.error('Failed to generate QR code:', err);
    }
  };

  const downloadPDF = async () => {
    if (!ticketRef.current || !ticket) return;

    setDownloading(true);
    try {
      // Capture the ticket as canvas
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: '#FAF3E1',
        logging: false,
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Hall-Ticket-${ticket.tid}.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF3E1]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#FF6D1F] mx-auto"></div>
          <p className="mt-4 text-[#222222] text-lg">Loading your ticket...</p>
        </div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF3E1] p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <svg
            className="w-16 h-16 mx-auto text-red-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-[#222222] mb-2">Error Loading Ticket</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/tickets')}
            className="bg-[#FF6D1F] text-white px-6 py-3 rounded-lg hover:bg-[#e55d0f] transition-colors"
          >
            Back to My Tickets
          </button>
        </div>
      </div>
    );
  }

  const registrationNumber = ticket.tid.toUpperCase();
  const eventName = ticket.eventId.title;
  const userName = ticket.userId.name;
  const userEmail = ticket.userId.email;
  const userCollege = ticket.userId.college || 'N/A';
  const userPhone = ticket.userId.phone || 'N/A';
  const eventDate = ticket.eventId.startDate
    ? new Date(ticket.eventId.startDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'TBA';

  return (
    <div className="min-h-screen bg-[#FAF3E1] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Action Buttons */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => navigate('/tickets')}
            className="bg-[#222222] text-white px-6 py-3 rounded-lg hover:bg-[#333333] transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to My Tickets
          </button>
          <button
            onClick={downloadPDF}
            disabled={downloading}
            className="bg-[#FF6D1F] text-white px-6 py-3 rounded-lg hover:bg-[#e55d0f] transition-colors flex items-center gap-2 disabled:bg-gray-400"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {downloading ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>

        {/* Hall Ticket */}
        <div
          ref={ticketRef}
          className="bg-white rounded-lg shadow-2xl overflow-hidden"
          style={{ padding: '40px' }}
        >
          {/* Header */}
          <div className="bg-[#FF6D1F] text-white p-8 rounded-t-lg text-center border-b-4 border-[#222222]">
            <h1 className="text-4xl font-bold mb-2">COLLEGE EVENT REGISTRATION</h1>
            <h2 className="text-2xl font-semibold">HALL TICKET</h2>
          </div>

          {/* Event Details Section */}
          <div className="bg-[#F5E7C6] p-6 border-b-4 border-dashed border-[#FF6D1F]">
            <h3 className="text-2xl font-bold text-[#222222] mb-4 text-center">
              {eventName}
            </h3>
            {ticket.eventId.description && (
              <p className="text-center text-gray-700 mb-2">
                {ticket.eventId.description}
              </p>
            )}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Event Date:</p>
                <p className="text-[#222222] font-bold">{eventDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Registration No:</p>
                <p className="text-[#222222] font-bold">{registrationNumber}</p>
              </div>
            </div>
          </div>

          {/* User Details Section */}
          <div className="p-6 border-b-4 border-[#F5E7C6]">
            <h3 className="text-xl font-bold text-[#222222] mb-4 bg-[#FAF3E1] p-3 rounded">
              ATTENDEE DETAILS
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Full Name:</p>
                <p className="text-lg text-[#222222] font-bold">{userName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Email:</p>
                <p className="text-lg text-[#222222]">{userEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">College/Institution:</p>
                <p className="text-lg text-[#222222]">{userCollege}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Phone:</p>
                <p className="text-lg text-[#222222]">{userPhone}</p>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="p-6 bg-[#FAF3E1] border-b-4 border-[#F5E7C6]">
            <h3 className="text-xl font-bold text-[#222222] mb-4 text-center">
              ENTRY QR CODE
            </h3>
            <div className="flex justify-center mb-4">
              {qrCodeUrl ? (
                <div className="bg-white p-4 rounded-lg shadow-lg border-4 border-[#FF6D1F]">
                  <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
                </div>
              ) : (
                <div className="bg-white p-4 rounded-lg shadow-lg border-4 border-[#FF6D1F] w-64 h-64 flex items-center justify-center">
                  <p className="text-gray-500">Loading QR Code...</p>
                </div>
              )}
            </div>
            <p className="text-center text-sm text-gray-600">
              Show this QR code at the venue gate for entry verification
            </p>
          </div>

          {/* Instructions Section */}
          <div className="p-6 bg-white">
            <h3 className="text-xl font-bold text-[#222222] mb-4 bg-[#F5E7C6] p-3 rounded">
              IMPORTANT INSTRUCTIONS
            </h3>
            <ul className="space-y-2 text-[#222222]">
              <li className="flex items-start">
                <span className="text-[#FF6D1F] font-bold mr-2">1.</span>
                <span>Carry a printed copy or digital version of this hall ticket to the venue.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF6D1F] font-bold mr-2">2.</span>
                <span>Present the QR code to the volunteer at the registration desk for scanning.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF6D1F] font-bold mr-2">3.</span>
                <span>Carry a valid government-issued ID for verification purposes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF6D1F] font-bold mr-2">4.</span>
                <span>Entry will be allowed only after successful QR code verification.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF6D1F] font-bold mr-2">5.</span>
                <span>Each ticket can be scanned only once. Duplicate entries will be denied.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF6D1F] font-bold mr-2">6.</span>
                <span>Report to the venue at least 30 minutes before the event starts.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF6D1F] font-bold mr-2">7.</span>
                <span>For any queries, contact the event organizers via the registered email.</span>
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className="bg-[#222222] text-white p-4 rounded-b-lg text-center mt-4">
            <p className="text-sm">
              Issued on: {new Date(ticket.issuedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <p className="text-xs mt-2 text-gray-300">
              This is a computer-generated ticket. No signature required.
            </p>
          </div>
        </div>

        {/* Status Badge */}
        {ticket.scanned && (
          <div className="mt-6 bg-green-100 border-4 border-green-500 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-green-700 mb-2">✓ CHECKED IN</h3>
            <p className="text-green-600">
              This ticket was scanned on{' '}
              {ticket.scannedAt
                ? new Date(ticket.scannedAt).toLocaleString()
                : 'Unknown date'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketPage;

