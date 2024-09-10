import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Dashboard = ({ financialData, bills }) => {
  const [timeRange, setTimeRange] = useState('6m');

  const upcomingBills = bills.filter(bill => {
    const dueDate = new Date(bill.dueDate);
    const today = new Date();
    const sevenDaysFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return dueDate >= today && dueDate <= sevenDaysFromNow;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle className="text-2xl">Financial Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-lg font-semibold">Investments</p>
              <p className="text-2xl text-blue-600">${financialData.investmentTotal.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">Savings</p>
              <p className="text-2xl text-green-600">${financialData.savings.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">Checking</p>
              <p className="text-2xl text-yellow-600">${financialData.checking.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">Upcoming Bills</p>
              <p className="text-2xl text-red-600">${financialData.upcomingBills.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Expense Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={financialData.expenseCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {financialData.expenseCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Income vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] mb-4">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={financialData.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl">Upcoming Bills (Next 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingBills.length > 0 ? (
            <ul className="space-y-2">
              {upcomingBills.map((bill, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                  <span className="font-semibold">{bill.name}</span>
                  <div className="text-right">
                    <span className="block text-red-600">${bill.amount.toFixed(2)}</span>
                    <span className="block text-sm text-gray-600">Due: {bill.dueDate}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No upcoming bills in the next 7 days.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;