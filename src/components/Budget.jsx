import React from 'react';
import { useQuery } from '@tanstack/react-query';
import BudgetSummary from './BudgetSummary';
import TransactionList from './TransactionList';
import { fetchBudgetData } from '../services/rocketMoneyApi';

const Budget = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['budgetData'],
    queryFn: fetchBudgetData,
  });

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