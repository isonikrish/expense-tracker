import React from 'react';

function NewTransaction() {
    return (
        <>
            <button className="btn flex items-center space-x-2" onClick={() => document.getElementById('my_modal_transaction').showModal()}>
                <span className="text-xl font-bold">+</span>
                <span>New Transaction</span>
            </button>
            <dialog id="my_modal_transaction" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
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
