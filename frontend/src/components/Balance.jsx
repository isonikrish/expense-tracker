import React, { useContext, useState } from 'react'
import { IoAdd } from "react-icons/io5";
import { useRecoilValue } from 'recoil';
import { currencyAtom, user } from '../store/atoms/auth';
import { MainContext } from '../store/MainContext';

function Balance() {
    const currency = useRecoilValue(currencyAtom)
    const loggedUser = useRecoilValue(user)
    const { handleAddBalance } = useContext(MainContext)
    const [amount, setAmount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    async function submitBalance(finalAmount) {
        setIsLoading(true)
        await handleAddBalance(finalAmount)
        setIsLoading(false);
    }
    return (
        <div className="indicator border">
            <div className="indicator-item indicator-bottom">
                <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_5').showModal()}><IoAdd className='text-xl' />
                    Add</button>

            </div>

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-10">Add Cash Balance: {currency?.symbol}</h3>
                    <input type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs"  onChange={(e) => setAmount(Number(e.target.value))} />
                    <div className="modal-action">
                        {isLoading ? <button className="btn">
                            <span className="loading loading-spinner"></span>
                            Adding
                        </button> : <button className="btn btn-success text-white mr-3 " onClick={()=>submitBalance(amount)}>Add</button>}

                        <form method="dialog">

                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <div className="card border">
                <div className="card-body">
                    <h2 className="card-title">Cash Balance: {currency?.symbol} {loggedUser?.balance}</h2>
                </div>
            </div>
        </div>
    )
}

export default Balance