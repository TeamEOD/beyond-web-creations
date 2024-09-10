// Rocket Money API configuration
export const API_BASE_URL = 'https://api.rocketmoney.com'; // Replace with actual Rocket Money API URL
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  BALANCE: '/balance',
  TRANSACTIONS: '/transactions',
};

// Flag to indicate if we're using a mock API (set to false for real API)
export const IS_MOCK_API = true; // Set this to false when ready to use real Rocket Money API

// Rocket Money API key (replace with your actual API key when available)
export const API_KEY = 'your_rocket_money_api_key_here';