// backend/src/utils/qr.ts
import QRCode from 'qrcode';

export const generateQRCode = async (data: string): Promise<string> => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(data, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.95,
      margin: 1,
      color: {
        dark: '#222222',
        light: '#FAF3E1'
      },
      width: 300
    });
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

export const generateTicketUrl = (projectName: string, eventName: string, registrationNumber: string): string => {
  const sanitize = (str: string) => str.toLowerCase().replace(/\s+/g, '-');
  return `${sanitize(projectName)}-${sanitize(eventName)}-${registrationNumber}`;
};