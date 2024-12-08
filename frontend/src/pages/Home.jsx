import React, { useEffect, useState } from 'react'
import Balance from '../components/Balance'
import AddCurrency from '../components/AddCurrency'
import NewTransaction from '../components/NewTransaction'
import { CiLogout } from "react-icons/ci";
import { useRecoilValue } from 'recoil';
import { expenseTransactions } from '../store/atoms/auth';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import TransactionHistory from '../components/TransactionHistory';
function Home() {
    const expenseTransactionsData = useRecoilValue(expenseTransactions) || [];
    const [expenseData, setExpenseData] = useState([]);
    useEffect(() => {

        const aggregatedData = expenseTransactionsData.reduce((acc, { category, amount }) => {
            const existingCategory = acc.find(item => item.name === category);
            if (existingCategory) {
                existingCategory.value += amount;
            } else {
                acc.push({ name: category, value: amount });
            }
            return acc;
        }, []);

        setExpenseData(aggregatedData);
    }, [expenseTransactions]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6699'];
    return (
        <div className='m-10'>
            <div className='flex justify-between items-center border-b'>
                <Balance />
                <div className='flex items-center gap-5'>
                    <AddCurrency />
                    <NewTransaction />
                    <>
                        <button className="btn flex items-center space-x-2">
                            <span className="text-xl font-bold"><CiLogout />
                            </span>
                            <span>Logout</span>
                        </button>
                    </>

                </div>

            </div>
            {/*Expense Graph */}
            <div className='mt-20'>
                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
                    Expense Graph
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={expenseData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {expenseData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            {/*transaction history */}
            <div className='mt-20'>
                <TransactionHistory />
            </div>
        </div>
    )
}

export default Home