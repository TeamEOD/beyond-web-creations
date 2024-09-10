import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const Bills = ({ bills }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Bill Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bills.map((bill, index) => (
          <TableRow key={index}>
            <TableCell>{bill.name}</TableCell>
            <TableCell>${bill.amount.toFixed(2)}</TableCell>
            <TableCell>{bill.dueDate}</TableCell>
            <TableCell>
              <Button asChild>
                <a href={bill.paymentLink} target="_blank" rel="noopener noreferrer">Pay</a>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Bills;