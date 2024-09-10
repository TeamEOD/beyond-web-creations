import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import BudgetSummary from './BudgetSummary';
import TransactionList from './TransactionList';
import LoginForm from './LoginForm';
import CsvHandler from './CsvHandler';
import { fetchBudgetData } from '../services/rocketMoneyApi';

const Budget = () => {
  const [credentials, setCredentials] = useState(null);
  const [budgetData, setBudgetData] = useState(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['budgetData', credentials],
    queryFn: () => fetchBudgetData(credentials.username, credentials.password),
    enabled: !!credentials,
    onSuccess: (data) => setBudgetData(data),
  });

  const handleLogin = (username, password) => {
    setCredentials({ username, password });
    refetch();
  };

  const handleCsvImport = (importedData) => {
    // Process the imported data and update the state
    // This is a simplified example; you'd need to adapt it to your data structure
    const newBudgetData = {
      ...budgetData,
      transactions: importedData.slice(1).map((row, index) => ({
        id: index,
        description: row[0],
        amount: parseFloat(row[1]),
      })),
    };
    setBudgetData(newBudgetData);
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
      <CsvHandler 
        onImport={handleCsvImport} 
        data={[
          ['Description', 'Amount'],
          ...budgetData.transactions.map(t => [t.description, t.amount.toString()])
        ]} 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BudgetSummary data={budgetData} />
        <TransactionList transactions={budgetData.transactions} />
      </div>
    </div>
  );
};

export default Budget;