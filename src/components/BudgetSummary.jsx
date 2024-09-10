import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BudgetSummary = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>Current Balance: ${data.balance.toFixed(2)}</p>
          <p>Total Income: ${data.income.toFixed(2)}</p>
          <p>Total Expenses: ${data.expenses.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetSummary;