import React, { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { typeAtom } from '../store/atoms/auth';
import { MainContext } from '../store/MainContext';

function NewTransaction() {
    const [type, setType] = useRecoilState(typeAtom);
    const [isLoading, setIsLoading] = useState(false)
    const { handleAddTransaction } = useContext(MainContext)
    const [data, setData] = useState({
        type,
        amount: 1,
        category: "",
    });

    const categories = ["Food", "Transport", "Entertainment", "Utilities", "Other"];
    useEffect(() => {
        setData(prevData => ({
            ...prevData,
            type: type,
        }));
    }, [type]);
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (name === 'amount') {
            setData({ ...data, amount: parseFloat(value) });
        } else if (name === 'category') {
            setData({ ...data, category: checked ? value : '' });
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true)
        await handleAddTransaction(data);
        setIsLoading(false)
    };

    return (
        <>
            <button className="btn flex items-center space-x-2" onClick={() => document.getElementById('my_modal_transaction').showModal()}>
                <span className="text-xl font-bold">+</span>
                <span>New Transaction</span>
            </button>

            <dialog id="my_modal_transaction" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div role="tablist" className="tabs tabs-bordered mb-4">
                        <a
                            role="tab"
                            className={`tab ${type === 'income' ? 'tab-active' : ''}`}
                            onClick={() => setType('income')}
                        >
                            INCOME
                        </a>
                        <a
                            role="tab"
                            className={`tab ${type === 'expense' ? 'tab-active' : ''}`}
                            onClick={() => setType('expense')}
                        >
                            EXPENSE
                        </a>
                    </div>

                    <div className="mb-4">
                        <input
                            type="number"
                            name="amount"
                            value={data.amount}
                            onChange={handleChange}
                            placeholder="Enter amount"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>

                    <div className="mb-4">
                        <div className="text-sm font-semibold">Select Categories</div>
                        <div className="flex flex-wrap gap-2 mt-10">
                            {categories.map((category) => (
                                <label key={category} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="category"
                                        value={category}
                                        checked={data.category === category}
                                        onChange={handleChange}
                                        className="radio"
                                    />
                                    <span>{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="modal-action">
                        {isLoading ? <button className="btn">
                            <span className="loading loading-spinner"></span>
                            Adding...
                        </button> :
                            <button className="btn btn-success text-white" onClick={handleSubmit}>Add Transaction</button>}
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default NewTransaction;
