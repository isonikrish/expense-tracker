import React from 'react'
import Balance from '../components/Balance'
import AddCurrency from '../components/AddCurrency'
import NewTransaction from '../components/NewTransaction'
import { CiLogout } from "react-icons/ci";

function Home() {
    return (
        <div className='m-10'>
            <div className='flex justify-between items-center'>
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

        </div>
    )
}

export default Home