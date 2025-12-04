import QRCode from 'qrcode';

export const generateQR = async (data: string): Promise<string> => {
  // returns dataURL PNG
  return QRCode.toDataURL(data, { errorCorrectionLevel: 'H' });
};
