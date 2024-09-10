import React from 'react';
import Budget from '../components/Budget';
import NavBar from '../components/NavBar';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Personal Budget Tracker</h1>
        <Budget />
      </div>
    </div>
  );
};

export default Index;