import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TransactionList = ({ transactions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="flex justify-between items-center">
              <span>{transaction.description}</span>
              <span className={transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}>
                ${Math.abs(transaction.amount).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TransactionList;