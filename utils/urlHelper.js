// backend/utils/urlHelper.js
const { NEXT_PUBLIC_FRONTEND_URL } = process.env;
const FRONTEND_URL = NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

export const createSafeRedirectUrl = (path, params = {}) => {
  try {
    const url = new URL(path, FRONTEND_URL);
    
    // Add parameters safely
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== 'null' && value !== 'undefined') {
        url.searchParams.set(key, value.toString());
      }
    });
    
    return url.toString();
  } catch (error) {
    console.error('Error creating redirect URL:', error);
    // Fallback URL
    return `${FRONTEND_URL}/payment-failed`;
  }
};