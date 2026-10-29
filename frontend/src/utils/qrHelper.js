import QRCode from 'qrcode';

/**
 * Generate high-res data URL for a given string (UPI URI, Pass verification data, etc.)
 */
export async function generateQrDataUrl(text, options = {}) {
  try {
    const defaultOptions = {
      width: 320,
      margin: 1.5,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M',
      ...options
    };
    return await QRCode.toDataURL(text, defaultOptions);
  } catch (err) {
    console.warn('Local QRCode generator fallback to dynamic URL', err);
    return `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=10&data=${encodeURIComponent(text)}`;
  }
}
