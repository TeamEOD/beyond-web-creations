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
    // Add more bills as needed
  ]);

  const [financialData] = useState({
    investmentTotal: 50000,
    savings: 10000,
    checking: 5000,
    upcomingBills: 1500,
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Personal Finance Manager</h1>
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
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
            <p>Investments content coming soon...</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;