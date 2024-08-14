// Server vs Browser
// See: https://github.com/vercel/next.js/issues/5354#issuecomment-520305040
export const IS_SERVER = process.server;
export const IS_BROWSER = process.client;

// Environment Constants
export const DEV = process.env.NODE_ENV === 'development';
export const PROD = process.env.NODE_ENV !== 'development';
