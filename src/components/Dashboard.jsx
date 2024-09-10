import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = ({ financialData, bills }) => {
  const upcomingBills = bills.filter(bill => {
    const dueDate = new Date(bill.dueDate);
    const today = new Date();
    const sevenDaysFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return dueDate >= today && dueDate <= sevenDaysFromNow;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>Investment Total: ${financialData.investmentTotal.toLocaleString()}</li>
            <li>Savings: ${financialData.savings.toLocaleString()}</li>
            <li>Checking: ${financialData.checking.toLocaleString()}</li>
            <li>Upcoming Bills: ${financialData.upcomingBills.toLocaleString()}</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bills (Next 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingBills.length > 0 ? (
            <ul className="space-y-2">
              {upcomingBills.map((bill, index) => (
                <li key={index} className="flex justify-between">
                  <span>{bill.name}</span>
                  <span>${bill.amount.toFixed(2)} - Due: {bill.dueDate}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming bills in the next 7 days.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;