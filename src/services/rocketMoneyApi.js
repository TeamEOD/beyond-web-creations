import axios from 'axios';

const API_BASE_URL = 'https://api.rocketmoney.com'; // Replace with actual Rocket Money API URL
const API_KEY = 'YOUR_ROCKET_MONEY_API_KEY'; // Replace with your actual API key

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const fetchBudgetData = async () => {
  try {
    const [balanceResponse, transactionsResponse] = await Promise.all([
      api.get('/balance'),
      api.get('/transactions'),
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
    console.error('Error fetching data from Rocket Money:', error);
    throw error;
  }
};