export const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE) {
    return import.meta.env.VITE_API_BASE;
  }
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const port = window.location.port;
  
  if (port === '5173' || port === '3000') {
    return `${protocol}//${hostname}:5000`;
  }
  return window.location.origin;
};

export const API_BASE_URL = getApiBaseUrl();
export const WHATSAPP_ADMIN = '6282219985254';
