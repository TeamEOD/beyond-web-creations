import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, IS_MOCK_API, API_KEY } from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  },
});

// Mock data for demonstration (remove when using real API)
const mockData = {
  balance: 5000,
  transactions: [
    { id: 1, description: 'Salary', amount: 3000 },
    { id: 2, description: 'Rent', amount: -1000 },
    { id: 3, description: 'Groceries', amount: -200 },
  ],
};

const login = async (username, password) => {
  if (IS_MOCK_API) {
    // Simulate login for mock API
    if (username === 'demo' && password === 'password') {
      return 'mock-token';
    } else {
      throw new Error('Invalid username or password');
    }
  }

  try {
    const response = await api.post(API_ENDPOINTS.LOGIN, { username, password });
    const { token } = response.data;
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return token;
  } catch (error) {
    handleApiError(error, 'Login failed');
  }
};

export const fetchBudgetData = async (username, password) => {
  if (IS_MOCK_API) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username !== 'demo' || password !== 'password') {
      throw new Error('Invalid credentials for mock API');
    }

    return {
      balance: mockData.balance,
      income: mockData.transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0),
      expenses: mockData.transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0),
      transactions: mockData.transactions,
    };
  }

  try {
    await login(username, password);

    const [balanceResponse, transactionsResponse] = await Promise.all([
      api.get(API_ENDPOINTS.BALANCE),
      api.get(API_ENDPOINTS.TRANSACTIONS),
    ]);

    const balance = balanceResponse.data.balance;
    const transactions = transactionsResponse.data.transactions;

    const income = transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return {
      balance,
      income,
      expenses,
      transactions,
    };
  } catch (error) {
    handleApiError(error, 'Failed to fetch budget data');
  }
};

const handleApiError = (error, defaultMessage) => {
  console.error(`${defaultMessage}:`, error);
  if (error.response) {
    switch (error.response.status) {
      case 401:
        throw new Error('Invalid credentials or session expired. Please log in again.');
      case 403:
        throw new Error('Access denied. Please check your account permissions.');
      case 404:
        throw new Error('Requested data not found. Please ensure your account is set up correctly.');
      case 429:
        throw new Error('Too many requests. Please try again later.');
      default:
        if (error.response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }
    }
  } else if (error.request) {
    throw new Error('Network error. Please check your internet connection.');
  }
  throw new Error(`${defaultMessage}. Please try again later.`);
};

export const retryFetchBudgetData = async (username, password, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetchBudgetData(username, password);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};