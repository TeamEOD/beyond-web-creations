import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const login = async (username, password) => {
  try {
    const response = await api.post(API_ENDPOINTS.LOGIN, { username, password });
    const { token } = response.data;
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return token;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Invalid username or password');
      } else if (error.response.status === 403) {
        throw new Error('Account locked. Please contact support');
      }
    }
    throw new Error('Login failed. Please try again later');
  }
};

export const fetchBudgetData = async (username, password) => {
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
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Session expired. Please log in again');
      } else if (error.response.status === 403) {
        throw new Error('Access denied. Please check your account permissions');
      }
    }
    throw new Error('Failed to fetch budget data. Please try again later');
  }
};