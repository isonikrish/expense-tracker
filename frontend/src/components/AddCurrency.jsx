import React, { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { currencyAtom, currencyOptionsAtom } from '../store/atoms/auth';
import { MainContext } from '../store/MainContext';

function AddCurrency() {
  const currencyOptions = useRecoilValue(currencyOptionsAtom)
  const {setCurrency} = useContext(MainContext);
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-primary m-1 flex items-center justify-between">
        Add Currency
        <span className="ml-2">▼</span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg"
      >
        {currencyOptions.map((currency) => {
          return (
            <li onClick={()=>setCurrency(currency)} key={currency.value}>
              <a className="flex justify-between items-center">
                {currency.value} <span className="text-sm text-gray-500">({currency.symbol})</span>
              </a>
            </li>
          )
        })}


      </ul>
    </div>
  );
}

export default AddCurrency;
