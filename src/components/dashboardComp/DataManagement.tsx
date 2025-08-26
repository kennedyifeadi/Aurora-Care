import React from 'react';
import { Download } from 'lucide-react';

interface DataManagementProps {
  totalRecords?: number;
  dataCompleteness?: number;
  lastExportDate?: string;
  onExportData?: () => void;
}

export const DataManagement: React.FC<DataManagementProps> = ({
  totalRecords = 247,
  dataCompleteness = 98,
  lastExportDate = "October 28, 2024",
  onExportData
}) => {
  const handleExportClick = () => {
    if (onExportData) {
      onExportData();
    } else {
      // Default functionality - create and download a sample CSV
      const sampleData = [
        ['Date', 'Records', 'Completeness'],
        ['2024-10-28', totalRecords.toString(), `${dataCompleteness}%`],
        ['2024-10-27', '245', '97%'],
        ['2024-10-26', '243', '96%']
      ];
      
      const csvContent = sampleData.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `health-data-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-6">
        <div className='flex-2 md:flex-none'>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Data Management</h2>
          <div className="space-y-1">
            <h3 className="text-base font-medium text-gray-700">Export Health Data</h3>
            <p className="text-sm text-gray-500">Download your complete health logs</p>
          </div>
        </div>
        <button
          onClick={handleExportClick}
          className="inline-flex flex-1 md:flex-none justify-center gap-2 items-center text-[12px] md:text-[14px] px-2 md:px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>
      
      <div className="text-sm text-gray-500 mb-6">
        Last export: {lastExportDate}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {totalRecords.toLocaleString()}
          </div>
          <div className="text-sm text-blue-700 font-medium">
            Total Records
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">
            {dataCompleteness}%
          </div>
          <div className="text-sm text-green-700 font-medium">
            Data Completeness
          </div>
        </div>
      </div>
    </div>
  );
};
