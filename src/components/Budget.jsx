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
        <h2 className="text-2xl font-bold mb-4">Login to Rocket Money</h2>
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  if (isLoading) return <div className="text-center">Loading budget data...</div>;
  if (error) return <div className="text-center text-red-500">Error fetching budget data: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <BudgetSummary data={data} />
      <TransactionList transactions={data.transactions} />
    </div>
  );
};

export default Budget;