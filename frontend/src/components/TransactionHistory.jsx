import React from 'react';
import { useRecoilValue } from 'recoil';
import { transactionHistory } from '../store/atoms/auth';
import { CSVLink } from 'react-csv';

function TransactionHistory() {
  const transactions = useRecoilValue(transactionHistory);

  const data = Array.isArray(transactions) && transactions.length > 0 
    ? transactions.map((transaction, index) => ({
        index: index + 1,
        type: transaction.type,
        category: transaction.category,
        amount: `$${transaction.amount}`,
      }))
    : [];

  const headers = [
    { label: "#", key: "index" },
    { label: "Type", key: "type" },
    { label: "Category", key: "category" },
    { label: "Amount", key: "amount" },
  ];

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4 text-center">Transaction History</h1>

      {/* Export Button */}
      <CSVLink
        data={data}
        headers={headers}
        filename="transactions.csv"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 inline-block"
      >
        Export to CSV
      </CSVLink>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-200 text-left text-sm">
              <th className="py-3 px-5">#</th>
              <th className="py-3 px-5">Type</th>
              <th className="py-3 px-5">Category</th>
              <th className="py-3 px-5">Amount</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {transactions?.map((transaction, index) => (
              <tr 
                key={transaction._id} 
                className={`border-b ${transaction.type === 'expense' ? 'bg-red-100' : 'bg-green-100'}`}
              >
                <td className="py-3 px-5">{index + 1}</td>
                <td className="py-3 px-5">{transaction.type}</td>
                <td className="py-3 px-5">{transaction.category}</td>
                <td className="py-3 px-5">
                  <span className={transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'}>
                    ${transaction.amount}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionHistory;
