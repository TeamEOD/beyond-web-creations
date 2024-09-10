import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import BudgetSummary from './BudgetSummary';
import TransactionList from './TransactionList';
import LoginForm from './LoginForm';
import { fetchBudgetData } from '../services/rocketMoneyApi';

const Budget = () => {
  const [credentials, setCredentials] = useState(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['budgetData', credentials],
    queryFn: () => fetchBudgetData(credentials.username, credentials.password),
    enabled: !!credentials,
  });

  const handleLogin = (username, password) => {
    setCredentials({ username, password });
    refetch();
  };

  if (!credentials) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Login to Your Budget</h2>
        <LoginForm onLogin={handleLogin} defaultUsername="" defaultPassword="" />
      </div>
    );
  }

  if (isLoading) return <div className="text-center">Loading budget data...</div>;
  if (error) return <div className="text-center text-red-500">Error fetching budget data: {error.message}</div>;

  return (
    <div className="space-y-8">
      <div className="text-right">
        <button 
          onClick={() => setCredentials(null)} 
          className="text-blue-500 hover:text-blue-700"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BudgetSummary data={data} />
        <TransactionList transactions={data.transactions} />
      </div>
    </div>
  );
};

export default Budget;