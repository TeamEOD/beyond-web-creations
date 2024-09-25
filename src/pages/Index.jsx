import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Budget from '../components/Budget';
import Bills from '../components/Bills';
import Dashboard from '../components/Dashboard';
import NavBar from '../components/NavBar';

const Index = () => {
  const [bills] = useState([
    { name: 'Electricity', amount: 100, dueDate: '2023-05-15', paymentLink: 'https://www.electriccompany.com' },
    { name: 'Internet', amount: 50, dueDate: '2023-05-20', paymentLink: 'https://www.internetprovider.com' },
    { name: 'Rent', amount: 1200, dueDate: '2023-06-01', paymentLink: 'https://www.rentpayment.com' },
  ]);

  const [financialData] = useState({
    investmentTotal: 50000,
    savings: 10000,
    checking: 5000,
    upcomingBills: 1500,
    expenseCategories: [
      { name: 'Housing', value: 1200 },
      { name: 'Utilities', value: 200 },
      { name: 'Food', value: 400 },
      { name: 'Transportation', value: 300 },
      { name: 'Entertainment', value: 200 },
    ],
    monthlyData: [
      { month: 'Jan', income: 4000, expenses: 3000 },
      { month: 'Feb', income: 4200, expenses: 3100 },
      { month: 'Mar', income: 4100, expenses: 2900 },
      { month: 'Apr', income: 4300, expenses: 3200 },
      { month: 'May', income: 4500, expenses: 3300 },
    ],
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-800">Personal Finance Manager</h1>
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="bills">Bills</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <Dashboard financialData={financialData} bills={bills} />
          </TabsContent>
          <TabsContent value="budget">
            <Budget />
          </TabsContent>
          <TabsContent value="bills">
            <Bills bills={bills} />
          </TabsContent>
          <TabsContent value="investments">
            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Investments</h2>
              <p className="text-lg">Total Investment: ${financialData.investmentTotal.toLocaleString()}</p>
              <p className="mt-4">Detailed investment information and management tools coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
