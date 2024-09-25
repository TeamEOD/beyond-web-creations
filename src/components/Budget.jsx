import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import BudgetSummary from './BudgetSummary';
import TransactionList from './TransactionList';
import LoginForm from './LoginForm';
import CsvHandler from './CsvHandler';
import { retryFetchBudgetData } from '../services/rocketMoneyApi';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Budget = () => {
  const [credentials, setCredentials] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const { data: budgetData, isLoading, error, refetch } = useQuery({
    queryKey: ['budgetData', credentials],
    queryFn: () => retryFetchBudgetData(credentials?.username, credentials?.password),
    enabled: !!credentials,
    onError: (error) => {
      setLoginError(error.message);
      setCredentials(null);
    },
    retry: false,
  });

  const handleLogin = (username, password) => {
    setLoginError(null);
    setCredentials({ username, password });
    refetch();
  };

  const handleCsvImport = (importedData) => {
    console.log('CSV import functionality not implemented yet', importedData);
  };

  const handleRetry = () => {
    setLoginError(null);
    refetch();
  };

  if (!credentials) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Login to Your Budget</h2>
        {loginError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{loginError}</AlertDescription>
          </Alert>
        )}
        <LoginForm onLogin={handleLogin} defaultUsername="" defaultPassword="" />
      </div>
    );
  }

  if (isLoading) return <div className="text-center">Loading budget data...</div>;
  
  if (error) return (
    <Alert variant="destructive" className="max-w-md mx-auto mt-8">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message}
        <Button onClick={handleRetry} className="mt-2 w-full">
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  );

  if (!budgetData) return <div className="text-center">No budget data available.</div>;

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
          ...(budgetData.transactions || []).map(t => [t.description, t.amount.toString()])
        ]} 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BudgetSummary data={budgetData} />
        <TransactionList transactions={budgetData.transactions || []} />
      </div>
    </div>
  );
};

export default Budget;
