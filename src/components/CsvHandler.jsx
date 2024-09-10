import React from 'react';
import { Button } from "@/components/ui/button";

const CsvHandler = ({ onImport, data }) => {
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target.result;
        const lines = csv.split('\n');
        const result = lines.map(line => line.split(','));
        onImport(result);
      };
      reader.readAsText(file);
    }
  };

  const handleExport = () => {
    const csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'budget_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex space-x-4 mb-4">
      <Button as="label" htmlFor="csv-upload">
        Import CSV
        <input
          id="csv-upload"
          type="file"
          accept=".csv"
          onChange={handleImport}
          className="hidden"
        />
      </Button>
      <Button onClick={handleExport}>Export CSV</Button>
    </div>
  );
};

export default CsvHandler;