import React from 'react';
import Budget from '../components/Budget';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Personal Budget Tracker</h1>
        <Budget />
      </div>
    </div>
  );
};

export default Index;