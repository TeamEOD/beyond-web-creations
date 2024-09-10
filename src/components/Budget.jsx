import React from 'react';
import { useQuery } from '@tanstack/react-query';
import BudgetSummary from './BudgetSummary';
import TransactionList from './TransactionList';

const fetchBudgetData = async () => {
  // This is a mock function. Replace with actual API call to Rocket Money
  return {
    balance: 5000,
    income: 3000,
    expenses: 2000,
    transactions: [
      { id: 1, description: 'Groceries', amount: -100, date: '2023-03-15' },
      { id: 2, description: 'Salary', amount: 3000, date: '2023-03-01' },
      { id: 3, description: 'Rent', amount: -1500, date: '2023-03-05' },
    ]
  };
};

const Budget = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['budgetData'],
    queryFn: fetchBudgetData,
  });

  if (isLoading) return <div className="text-center">Loading budget data...</div>;
  if (error) return <div className="text-center text-red-500">Error fetching budget data</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <BudgetSummary data={data} />
      <TransactionList transactions={data.transactions} />
    </div>
  );
};

export default Budget;